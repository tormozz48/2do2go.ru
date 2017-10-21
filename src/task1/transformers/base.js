'use strict';

const debug = debug('task1:transformers:base');

/**
 * Базовый класс для транформеров
 * @class BaseTransformer
 */
class BaseTransformer {
    constructor(options = {}) {
        this._options = this._parseOptions(options);
        this._lastInStack = null;
        this._next = null;

        debug(`transformer ${this.constructor.name} has been created`);
        debug(`options: `);
        debug(this._options);
    }

    /**
     * Parses transformer options 
     * @memberof BaseTransformer
     */
    parseOptions() {
        throw new Error('not implmented');
    }

    /**
     * Executes tranformer with given data
     * @param {any} data 
     * @returns 
     * @memberof BaseTransformer
     */
    run(data) {
        debug(`run transformer: ${this.constructor.name}`);

        data = this._transform(data);
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
     * @memberof BaseTransformer
     */
    transform() {
        throw new Error('not implemented');
    }
}

module.exports = BaseTransformer;