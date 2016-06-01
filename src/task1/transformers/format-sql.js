'use strict';

const BaseTransformer = require('./base');

module.exports = class SQLFormatTransformer extends BaseTransformer {
    run(data) {
        return data;
    }
};
