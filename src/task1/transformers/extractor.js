'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

module.exports = class ExtractTransformer extends BaseTransformer {
    run(data) {
        data = this.baseTransformer.run(data);

        return data.map(item => {
            item = _.get(item, 'data', {});
            return _.pick(item, this.options.fields);
        });
    }
};

