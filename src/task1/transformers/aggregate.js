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
        return _.defaults(options, {});
    }

    transform(data) {
        // TODO implement it
        return data;
    }
}

module.exports = AggregateTransformer;