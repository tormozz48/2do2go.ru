'use strict';

const moment = require('moment');
const BaseTransformer = require('./base');

/**
 * Transforms date fields of data items to "DD.MM.YYYY HH:mm:ss"
 * @type {DateFormatTransformer}
 */
module.exports = class DateFormatTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {Object[]} data
     */
    run(data) {
        data = this.baseTransformer.run(data);

        const DATE_FORMAT = 'DD.MM.YYYY HH:mm:ss';
        const dateFields = this.options.dateFields || [];

        if(dateFields.length === 0) {
            return data;
        }

        return data.map(item => {
            dateFields.forEach(field => {
                item[field] = moment(item[field] * 1000).format(DATE_FORMAT);
            });
            return item;
        });
    }
};

