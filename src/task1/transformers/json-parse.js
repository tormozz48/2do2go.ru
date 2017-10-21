'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Нужен для парсинга исходных JSON данных.
 * Возвращает данные полученного объекта по сконфигурированному ключу.
 * @class JSONParseTransformer
 * @extends {BaseTransformer}
 */
class JSONParseTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options, {dataKey: 'data.children'});
    }

    transform(data) {
        try {
            data = JSON.parse(data);
            return _.get(data, this._options.dataKey, []);
        } catch(error) {
            return [];
        }
    }
}

module.exports = JSONParseTransformer;