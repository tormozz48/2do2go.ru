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
            // Клонируем элемент, чтобы не модифицировать исходный
            const _item = _.cloneDeep(item);
            fields.forEach(field => {
                // Время в данных указано в секундах, поэтому переводим в миллисекунды
                _item[field] = moment.utc(_item[field] * 1000).format(format);
            });
            return _item;
        });
    }
}

module.exports = DateFormatTransformer;