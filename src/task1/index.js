'use strict';

const transformers = require('./transformers');

module.exports = (jsonData, sort, output) => {
    let transformer = transformers.DefaultTransformer.create();

    transformer = transformers.ParseTransformer.create(transformer, {
        dataKey: 'data.children'
    });

    transformer = transformers.ExtractTransformer.create(transformer, {
        fields: ['id', 'title', 'created_utc', 'score']
    });

    transformer = transformers.SortTransformer
        .create(transformer, sort || {field: 'created_utc', direction: 'asc'});

    output = output || {type: 'json'};

    const Formatter = {
        'json': transformers.JSONFormatter,
        'csv': transformers.CSVFormatter,
        'sql': transformers.SQLFormatter
    }[output.type];

    transformer = Formatter.create(transformer, output.options);

    return transformer.run(jsonData);
};
