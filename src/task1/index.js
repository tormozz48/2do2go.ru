'use strict';

const _ = require('lodash');
const transformers = require('./transformers');

/**
 * @param {String} jsonData
 * @param {Object} [sort] - sort parameters
 * @param {String} [sort.field] - sorting field
 * @param {String} [sort.direction] - sorting direction (asc, desc)
 * @param {Object} [output] format
 * @param {String} [output.type] - type of output (json, csv, sql ...)
 * @param {Object} [output.options] - output formatter options
 * @returns {String}
 */
module.exports = (jsonData, sort, output) => {
    const operations = [];

    //Парсится JSON и извлекается искомый массив с данными
    operations.push(transformers.parseTransformer({
        dataKey: 'data.children'
    }));

    //В элементах массива оставляются только нужные поля
    operations.push(transformers.extractTransformer({
        fields: ['id', 'title', 'created_utc', 'score']
    }));

    //Происходит сортировка элементов массива с переданными параметрами
    operations.push(transformers.sortTransformer(_.defaults(sort, {
        field: 'created_utc',
        direction: 'asc'
    })));

    //Поле(я) даты преобразуется к нужному формату
    operations.push(transformers.dateFormatTransformer({
        dateFields: ['created_utc']
    }));
    
    output = _.defaults(output, {type: 'json'});

    //Выбирается нужный транформер в зависимости от переданного формата выходных данных
    const formatter = {
        'json': transformers.outputJSONTransformer,
        'csv': transformers.outputCSVTransformer,
        'sql': transformers.outputSQLTransformer
    }[output.type];

    operations.push(formatter(output.options || {}));

    return operations.reduce((prev, item) => item(prev), jsonData);
};
