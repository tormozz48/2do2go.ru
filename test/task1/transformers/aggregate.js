'use strict';

const {AggregateTransformer} = require('../../../src/task1/transformers');

describe('src/task1/transformers/aggregate', () => {
    it('should return unmodified data if aggregation field was not configured', () => {
        const aggregateTransformer = new AggregateTransformer({});
        const inputData = [
            {foo: 'foo1', bar: 'bar1'},
            {foo: 'foo2', bar: 'bar2'}
        ];

        assert.deepEqual(aggregateTransformer.run(inputData), inputData);
    });

    it('should group by configured aggregation field', () => {
        const aggregateTransformer = new AggregateTransformer({aggregate: {field: 'foo'}});
        const inputData = [
            {foo: 'foo1', bar: 'bar1'},
            {foo: 'foo1', bar: 'bar11'},
            {foo: 'foo2', bar: 'bar2'},
            {foo: 'foo2', bar: 'bar22'}
        ];

        const result = aggregateTransformer.run(inputData);

        assert.lengthOf(result, 2);
        assert.equal(result[0].field, 'foo1');
        assert.equal(result[1].field, 'foo2');
    });

    it('should count items of each group', () => {
        const aggregateTransformer = new AggregateTransformer({aggregate: {field: 'foo'}});
        const inputData = [
            {foo: 'foo1', bar: 'bar1'},
            {foo: 'foo2', bar: 'bar2'},
            {foo: 'foo2', bar: 'bar22'},
            {foo: 'foo2', bar: 'bar222'}
        ];

        const result = aggregateTransformer.run(inputData);

        assert.equal(result[0].count, 1);
        assert.equal(result[1].count, 3);
    });

    it('should calculate sum of all number fields for each group', () => {
        const aggregateTransformer = new AggregateTransformer({aggregate: {field: 'foo'}});
        const inputData = [
            {foo: 'foo1', bar: 1},
            {foo: 'foo1', bar: 4},
            {foo: 'foo2', bar: 3},
            {foo: 'foo2', bar: 5}
        ];

        const result = aggregateTransformer.run(inputData);

        assert.equal(result[0].bar, 5);
        assert.equal(result[1].bar, 8);
    });
});