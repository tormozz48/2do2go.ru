'use strict';

const transformers = require('../../../src/task1/transformers');

describe('DefaultTransformer', () => {
    it('should return passed data as is', () => {
        const transformer = transformers.DefaultTransformer.create();
        const data = {foo: 'bar'};

        expect(transformer.run(data)).eql(data);
    });
});
