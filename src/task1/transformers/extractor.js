'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Transformer which is needed for leave only configured fields in data items
 * @type {ExtractTransformer}
 */
module.exports = class ExtractTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {Object[]} data
     */
    run(data) {
        data = this.baseTransformer.run(data);

        return data.map(item => {
            item = _.get(item, 'data', {});
            return _.pick(item, this.options.fields);
        });
    }
};

