'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * @class JSONOutputTransformer
 * @extends {BaseTransformer}
 */
class JSONOutputTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options, {spaces: 0});
    }

    transform(data) {
        return JSON.stringify(data, null, this._options.spaces)
    }
}

module.exports = JSONOutputTransformer;