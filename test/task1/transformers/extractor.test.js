'use strict';

const transformers = require('../../../src/task1/transformers');

describe('ExtractTransformer', () => {
    it('should left only passed fields', () => {
        let transformer = transformers.DefaultTransformer.create();
        transformer = transformers.ExtractTransformer
            .create(transformer, {fields: ['field1', 'field2']});

        const data = [
            {
                data: {
                    field1: 'some-value1',
                    field2: 'some-value2',
                    field3: 'some-value2'
                }
            }
        ];

        expect(transformer.run(data)).eql([
            {
                field1: 'some-value1',
                field2: 'some-value2'
            }
        ]);
    });
});

