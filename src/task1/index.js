'use strict';

const _ = require('lodash');
const transformers = require('./transformers');

/**
 * @param {String}   jsonData
 * @param {Object}   [options]
 * @param {String}   [options.dataKey] - object key which holds target data
 * @param {String[]} [options.extractFields] - data fields which should be left in final result
 * @param {Object}   [options.sort] - sort options
 * @param {Object}   [options.sort.field] - sort field
 * @param {Object}   [options.sort.direction] - sort direction
 * @param {Object}   [options.date] - date format options
 * @param {String[]} [options.date.fields] - date fields which should be formatted
 * @param {String}   [options.date.format] - date format
 * @param {Object}   [output] - output format settings
 * @param {String}   [output.type] - type of output (json, csv, sql ...). Default falue is 'json'
 * @param {Object}   [output.options] - output formatter options
 * @returns {String}
 */
module.exports = (jsonData, options, output) => {
    return new transformers.JSONParseTransformer(options)
        .next(new transformers.DateFormatTransformer(options))
        .next(new transformers.AggregateTransformer(options))
        .next(new transformers.SortTransformer(options))
        .next(new transformers.ExtractTransformer(options))
        .next(new transformers.OutputTransformer(output))
        .run(jsonData);
};
