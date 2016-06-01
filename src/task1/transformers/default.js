'use strict';

const BaseTransformer = require('./base');

/**
 * Default transformer which does not actually transform data and return it as is.
 * @type {DefaultTransformer}
 */
module.exports = class DefaultTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {String|Object[]} data
     */
    run(data) {
        return data;
    }
};
