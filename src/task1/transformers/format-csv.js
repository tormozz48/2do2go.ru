'use strict';

const _ = require('lodash');
const json2csv = require('json2csv');
const BaseTransformer = require('./base');

module.exports = class CSVFormatTransformer extends BaseTransformer {
    run(data) {
        data = this.baseTransformer.run(data);
        return json2csv(_.extend({data}, this.options));
    }
};
