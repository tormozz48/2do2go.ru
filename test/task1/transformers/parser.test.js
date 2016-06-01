'use strict';

const transformers = require('../../../src/task1/transformers');

describe('ParseTransformer', () => {
    let transformer;

    beforeEach(() => {
        transformer = transformers.DefaultTransformer.create();
        transformer = transformers.ParseTransformer.create(transformer, {dataKey: 'foo.bar'});
    });

    it('should parse JSON and return data for given "dataKey"', () => {
        const data = JSON.stringify({
            foo: {
                bar: ['item1', 'item2']
            }
        });
        expect(transformer.run(data)).to.eql(['item1', 'item2']);
    });

    it('should return empty array on JSON parse error', () => {
        expect(transformer.run()).to.eql([]);
    });

    it('should return empty array if data was not found for given "dataKey"', () => {
        const data = JSON.stringify({someKey: 'some-value'});
        expect(transformer.run(data)).to.eql([]);
    });
});

