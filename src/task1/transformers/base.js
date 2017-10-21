const _ = require('lodash');
const debug = debug('task1:transformers:base');

class BaseTransformer {
    constructor(options = {}) {
        this._options = this._parseOptions(options);
        this._lastInStack = null;
        this._next = null;
    }

    /**
     * Parses transformer options
     * @param {Object} options 
     * @memberof BaseTransformer
     */
    parseOptions(options) {
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
     * @param {any} data 
     * @memberof BaseTransformer
     */
    transform(data) {
        throw new Error('not implemented');
    }
}

module.exports = BaseTransformer;