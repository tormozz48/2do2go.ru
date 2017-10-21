'use strict';

const _ = require('lodash');
const BaseTransformer = require('../base');

const CSVOutputTransformer = require('./csv');
const JSONOutputTransformer = require('./json');
const SQLOutputTransformer = require('./sql');

/**

 * @class OutputTransformer
 * @extends {BaseTransformer}
 */
class OutputTransformer extends BaseTransformer {
    constructor(output) {
        super(output);

        const SelectedTransformer = {
            'json': JSONOutputTransformer,
            'csv': CSVOutputTransformer,
            'sql': SQLOutputTransformer
        }[this._options.type];

        this._selectedTransformer = new SelectedTransformer(this._options);
    }

    parseOptions(output) {
        return _.defaults(output, {type: 'json'});
    }

    transform(data) {
        return this._selectedTransformer.transform(data);
    }
}

module.exports = OutputTransformer;