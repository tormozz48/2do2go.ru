'use strict';

const _ = require('lodash');
const JsonSql = require('json-sql');
const BaseTransformer = require('../base');

/**
 * @class SQLOutputTransformer
 * @extends {BaseTransformer}
 */
class SQLOutputTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options, {table: 'table'});
    }

    transform(data) {
        const {dialect, table} = this._options;

        const jsonSql = JsonSql({separatedValues: false, dialect});
    
        return data
            .map(item => jsonSql.build({type: 'insert', table, values: item}).query)
            .join('\n');
    }
}

module.exports = SQLOutputTransformer;