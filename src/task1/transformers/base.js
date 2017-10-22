'use strict';

const debug = require('debug')('task1:transformers:base');

/**
 * Базовый класс для транформеров
 * @class BaseTransformer
 */
class BaseTransformer {
    static create(...args) {
        return new this(...args);
    }

    constructor(options = {}) {
        this._options = this.parseOptions(options);
        this._lastInStack = null;
        this._next = null;

        debug(`transformer ${this.constructor.name} has been created`);
        debug(`options: `);
        debug(this._options);
    }

    /**
     * Parses transformer options 
     * @param {Object} options
     * @returns
     * @memberof BaseTransformer
     */
    parseOptions(options) {
        return options
    }

    /**
     * Executes tranformer with given data
     * @param {any} data 
     * @returns 
     * @memberof BaseTransformer
     */
    run(data) {
        debug(`run transformer: ${this.constructor.name}`);

        data = this.transform(data);
        return this._next ? this._next.run(data) : data;
    }

    /**
     * Sets transformer which should be executed next
     * @param {BaseTransformer} transformer 
     * @returns
     * @memberof BaseTransformer
     */
    next(transformer) {
        debug(`${this.constructor.name} set next ${transformer.constructor.name}`);

        this._lastInStack 
            ? this._lastInStack.next(transformer)
            : this._next = transformer;

        this._lastInStack = transformer;

        return this;
    }

    /**
     * Transforms given data
     * @param {Object[]|String} data
     * @returns
     * @memberof BaseTransformer
     */
    transform(data) {
        return data;
    }
}

module.exports = BaseTransformer;