'use strict';

const _ = require('lodash');
const moment = require('moment');
const JsonSql = require('json-sql');

/**
 * Transformer for JSON parsing and data extracting for given "dataKey" option
 * @param {Object} options
 * @param {String} options.dataKey - data key for extracting data
 * @returns {function()}
 */
function parseTransformer(options) {
    return (data) => {
        try {
            data = JSON.parse(data);
            return _.get(data, options.dataKey, []);
        } catch(error) {
            return [];
        }
    };
}

/**
 * Transformer which is needed for leave only configured fields in data items
 * @param {Object} options
 * @param {String[]} options.fields=[] - options fields which should be left in data set
 * @returns {function()}
 */
function extractTransformer(options) {
    options.fields = options.fields || [];

    return (data) => {
        return data.map(item => {
            item = _.get(item, 'data', {});
            return _.pick(item, options.fields);
        });
    };
}

/**
 * Performs sorting of data items array by configured sort criteria
 * @param {Object} options
 * @param {String} options.field - sort field
 * @param {String} options.direction='asc' - sort direction ("asc", "desc")
 * @returns {function()}
 */
function sortTransformer(options) {
    const field = options.field;
    const direction = options.direction || 'asc';

    const _direction = {
        'asc': 1,
        'desc': -1
    }[direction];

    return (data) => data.sort((a, b) => _direction * (a[field] - b[field]));
}

/**
 * Transforms date fields of data items to "DD.MM.YYYY HH:mm:ss"
 * @param {Object} options
 * @param {String[]} options.dateFields - array of date field names
 * @param {String} [options.dateFormat]
 * @returns {function()}
 */
function dateFormatTransformer(options) {
    const DATE_FORMAT = options.dateFormat || 'DD.MM.YYYY HH:mm:ss';
    const dateFields = options.dateFields || [];

    return (data) => {
        if(dateFields.length === 0) {
            return data;
        }

        return data.map(item => {
            dateFields.forEach(field => {
                item[field] = moment(item[field] * 1000).format(DATE_FORMAT);
            });
            return item;
        });
    };
}

/**
 * Transforms data into output JSON format using JSON.stringify
 * @param {Object} options
 * @param {Number} options.spaces - number of spaces
 * @returns {function()}
 */
function outputJSONTransformer(options) {
    const spaces = options.spaces || 0;
    return (data) => JSON.stringify(data, null, spaces);
}

/**
 * Здесь можно было бы использовать какой-либо из существующих модулей
 * для конвертации в csv формат, но очень хотелось иметь именно синхронный код
 * а все найденные мной модули были асинхронные.
 */

/**
 * Sync transformer from JSON to CSV format
 * @param {Object} options
 * @param {String} [options.delimiter=','] - csv delimiter
 * @param {Boolean} [options.addHeader] - boolean flag. If true then column titles are added as first row
 * @returns {function()}
 */
function outputCSVTransformer(options) {
    const delimiter = options.delimiter || ',';

    return (data) => {
        const fields = Object.keys(data[0]);
        const csv = data.map((row) => {
            return fields
                .map((fieldName) => `"${row[fieldName]}"`)
                .join(delimiter);
        });

        if(options.addHeader) {
            csv.unshift(fields);
        }
        return csv.join('\r\n');
    };
}

/**
 * Converts data into set of SQL insert rows
 * @param {Object} options
 * @param {String} [options.dialect]
 * @param {String} [options.table='base'] - name of db table
 * @returns {function()}
 */
function outputSQLTransformer(options) {
    const jsonSql = JsonSql({
        separatedValues: false,
        dialect: options.dialect
    });

    const table = options.table || 'table';

    return (data) => data
        .map(item => jsonSql.build({type: 'insert', table, values: item}).query)
        .join('\n');
}

module.exports = {
    parseTransformer,
    extractTransformer,
    sortTransformer,
    dateFormatTransformer,
    outputJSONTransformer,
    outputCSVTransformer,
    outputSQLTransformer
};
