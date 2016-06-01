'use strict';

const BaseTransformer = require('./base');

/**
 * Converts data into JSON output format
 * @type {JSONFormatTransformer}
 */
module.exports = class JSONFormatTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {Object[]} data
     */
    run(data) {
        data = this.baseTransformer.run(data);

        const replacer = this.options.replacer || null;
        const space = this.options.space || 0;

        return JSON.stringify(data, replacer, space);
    }
};

