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
        return _(data)
            .map(item => {
                item = _.get(item, 'data', null);
                return item ? _.pick(item, this._options.extractFields) : null;
            })
            .compact()
            .value();
    }
}

module.exports = ExtractTransformer;