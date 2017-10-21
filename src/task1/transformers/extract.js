'use strict';

const _ = require('lodash');
const BaseTransformer = require('./base');

/**
 * Нужен для извлечения указанных полей из элементов входных данных
 * @class ExtractTransformer
 * @extends {BaseTransformer}
 */
class ExtractTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options, {extractFields: ['id', 'title', 'created_utc', 'score']});
    }

    transform(data) {
        return data.map(item => {
            item = _.get(item, 'data', {});
            return _.pick(item, this._options.extractFields);
        });
    }
}

module.exports = ExtractTransformer;