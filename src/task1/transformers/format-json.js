'use strict';

const BaseTransformer = require('./base');

module.exports = class JSONFormatTransformer extends BaseTransformer {
    run(data) {
        data = this.baseTransformer.run(data);
        return JSON.stringify(data);
    }
};

