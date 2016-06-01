'use strict';

const transformers = require('../../../src/task1/transformers');

describe('SortTransformer', () => {
    let data;

    beforeEach(() => {
        data = [
            {field1: 3, field2: 'some-value23'},
            {field1: 1, field2: 'some-value21'},
            {field1: 2, field2: 'some-value22'}
        ];
    });

    it('should sort data by given field and "asc" direction', () => {
        let transformer = transformers.DefaultTransformer.create();
        transformer = transformers.SortTransformer
            .create(transformer, {field: 'field1', direction: 'asc'});

        expect(transformer.run(data)).eql([
            {field1: 1, field2: 'some-value21'},
            {field1: 2, field2: 'some-value22'},
            {field1: 3, field2: 'some-value23'}
        ]);
    });

    it('should sort data by given field and "desc" direction', () => {
        let transformer = transformers.DefaultTransformer.create();
        transformer = transformers.SortTransformer
            .create(transformer, {field: 'field1', direction: 'desc'});

        expect(transformer.run(data)).eql([
            {field1: 3, field2: 'some-value23'},
            {field1: 2, field2: 'some-value22'},
            {field1: 1, field2: 'some-value21'}
        ]);
    });
});


