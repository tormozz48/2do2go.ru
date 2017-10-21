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
    
        const _direction = {
            'asc': 1,
            'desc': -1
        }[direction];
    
        return data.sort((a, b) => _direction * (a[field] - b[field]));
    }
}

module.exports = SortTransformer;