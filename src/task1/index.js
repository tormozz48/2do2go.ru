'use strict';

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
    let transformer = transformers.DefaultTransformer.create();

    //Парсится JSON и извлекается искомый массив с данными
    transformer = transformers.ParseTransformer.create(transformer, {
        dataKey: 'data.children'
    });

    //В элементах массива оставляются только нужные поля
    transformer = transformers.ExtractTransformer.create(transformer, {
        fields: ['id', 'title', 'created_utc', 'score']
    });

    //Происходит сортировка элементов массива с переданными параметрами
    transformer = transformers.SortTransformer.create(transformer, sort || {
        field: 'created_utc',
        direction: 'asc'
    });

    //Поле(я) даты преобразуется к нужному формату
    transformer = transformers.DateFormatTransformer.create(transformer, {
        dateFields: ['created_utc']
    });
    
    output = output || {type: 'json'};

    //Выбирается нужный транформер в зависимости от переданного формата выходных данных
    const Formatter = {
        'json': transformers.JSONFormatter,
        'csv': transformers.CSVFormatter,
        'sql': transformers.SQLFormatter
    }[output.type];

    transformer = Formatter.create(transformer, output.options || {});

    return transformer.run(jsonData);
};
