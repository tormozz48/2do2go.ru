'use strict';

/**
 * Base transformer class
 * @type {BaseTransformer}
 */
module.exports = class BaseTransformer {
    /**
     * @param {BaseTransformer} baseTransformer - underlying transformer
     * @param {Object} options - transformer options
     * @constructor
     */
    constructor(baseTransformer, options) {
        this.baseTransformer = baseTransformer;
        this.options = options;
    }

    /**
     * Performs transformation on given data
     * @param {String|Object[]} data
     */
    run(data) {
        throw new Error('not implemented');
    }

    /**
     * Static factory for transformer
     * @param {BaseTransformer} baseTransformer - underlying transformer
     * @param {Object} options - transformer options
     * @returns {BaseTransformer}
     * @static
     */
    static create(baseTransformer, options) {
        return new this(baseTransformer, options);
    }
};

