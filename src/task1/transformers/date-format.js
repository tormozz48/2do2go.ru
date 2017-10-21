'use strict';

const _ = require('lodash');
const moment = require('moment');
const BaseTransformer = require('./base');

/**
 * 
 * @class DateFormatTransformer
 * @extends {BaseTransformer}
 */
class DateFormatTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options.date, {format: 'DD.MM.YYYY HH:mm:ss', fields: []});
    }

    transform(data) {
        if(_.isEmpty(this._options.fields)) {
            return data;
        }

        return data.map(item => {
            dateFields.forEach(field => {
                item[field] = moment(item[field] * 1000).format(this._options.format);
            });
            return item;
        });
    }
}

module.exports = DateFormatTransformer;