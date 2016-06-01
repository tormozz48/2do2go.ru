'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Transformer for JSON parsing and data extracting for given "dataKey" option
 * @type {ParseTransformer}
 */
module.exports = class ParseTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {String|Object[]} data
     */
    run(data) {
        data = this.baseTransformer.run(data);

        try {
            data = JSON.parse(data);
            return _.get(data, this.options.dataKey, []);
        } catch(error) {
            return [];
        }
    }
};
