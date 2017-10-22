'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Нужен для сортировки входных данных
 * @class SortTransformer
 * @extends {BaseTransformer}
 */
class SortTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options.sort, {field: 'created_utc', direction: 'asc'});
    }

    transform(data) {
        const {field, direction} = this._options;
        const transform = {
            'asc': _.identity,
            'desc': _.reverse
        }[direction];
    
        return _(data)
            .sortBy([field])
            .thru(transform)
            .value();
    }
}

module.exports = SortTransformer;