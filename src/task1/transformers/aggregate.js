'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Нужен для аггрегации данных по какому-либо из полей
 * @class AggregateTransformer
 * @extends {BaseTransformer}
 */
class AggregateTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options.aggregate, {});
    }

    transform(data) {
        const {field} = this._options;
        
        if (!field) {
            return data;
        }

        return _(data)
            .groupBy(field)
            .mapValues((value) => _.extend({count: value.length}, this._calculateSums(value)))
            .map((value, key) => _.extend({field: key}, value))
            .value();
    }

    // Вычисляем суммы для всех числовых полей
    _calculateSums(group) {
        const res = _.reduce(group, (acc, item) => {
            _.forEach(item, (value, key) => {
                if (_.isNumber(value)) {
                    acc[key] = acc[key] || 0;
                    acc[key] += value;
                }
            });

            return acc;    
        }, {});

        return res;
    }
}

module.exports = AggregateTransformer;