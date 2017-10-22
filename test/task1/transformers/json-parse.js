'use strict';

const {JSONParseTransformer} = require('../../../src/task1/transformers');

describe('src/task1/transformers/json-parse', () => {
    describe('should return parsed data', () => {
        it('by configured "dataKey" options', () => {
            const jsonParseTransformer = new JSONParseTransformer({dataKey: 'foo.bar'});
            const inputData = JSON.stringify({
                foo: {
                    bar: ['item1', 'item2']
                }
            });

            assert.deepEqual(jsonParseTransformer.run(inputData), ['item1', 'item2']);
        });

        it('by default "dataKey" options', () => {
            const jsonParseTransformer = new JSONParseTransformer({});
            const inputData = JSON.stringify({
                data: {
                    children: ['item1', 'item2']
                }
            });

            assert.deepEqual(jsonParseTransformer.run(inputData), ['item1', 'item2']);
        });
    });

    describe('should return empty array', () => {
        it('if data was not found for given data key', () => {
            const jsonParseTransformer = new JSONParseTransformer({dataKey: 'foo.bar'});
            const inputData = JSON.stringify({
                data: {
                    children: ['item1', 'item2']
                }
            });

            assert.deepEqual(jsonParseTransformer.run(inputData), []);
        });

        it('if error occured while JSON parsing', () => {
            const jsonParseTransformer = new JSONParseTransformer({});
            const inputData = 'some invalid JSON structure';

            assert.deepEqual(jsonParseTransformer.run(inputData), []);
        });
    });
});    