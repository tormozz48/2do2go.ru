'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
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