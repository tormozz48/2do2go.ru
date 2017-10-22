'use strict';

const _ = require('lodash');
const moment = require('moment');
const BaseTransformer = require('./base');

/**
 * Форматирует поля даты/времени
 * @class DateFormatTransformer
 * @extends {BaseTransformer}
 */
class DateFormatTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options.date, {format: 'DD.MM.YYYY HH:mm:ss', fields: []});
    }

    transform(data) {
        const {fields, format} = this._options;

        if(_.isEmpty(fields)) {
            return data;
        }

        return data.map(item => {
            fields.forEach(field => {
                item[field] = moment(item[field] * 1000).format(format);
            });
            return item;
        });
    }
}

module.exports = DateFormatTransformer;