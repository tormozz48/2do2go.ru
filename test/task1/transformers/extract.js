'use strict';

const {ExtractTransformer} = require('../../../src/task1/transformers');

describe('src/task1/transformers/extract', () => {
    it('should pick congigured fields', () => {
        const extractTransformer = new ExtractTransformer({extractFields: ['foo']});
        const inputData = [
            {data: {foo: 'some-foo1', bar: 'some-bar1'}},
            {data: {foo: 'some-foo2', bar: 'some-bar2'}}
        ];

        assert.deepEqual(
            extractTransformer.run(inputData), 
            [
                {foo: 'some-foo1'}, 
                {foo: 'some-foo2'}
            ]
        );
    });

    it('should pick default fields', () => {
        const extractTransformer = new ExtractTransformer({});
        const inputData = [
            {data: {id: 1, title: 'some-title1', foo: 'some-foo1'}},
            {data: {id: 2, title: 'some-title2', foo: 'some-foo2'}}
        ];

        assert.deepEqual(
            extractTransformer.run(inputData), 
            [
                {id: 1, title: 'some-title1'}, 
                {id: 2, title: 'some-title2'}
            ]
        );
    });

    it('should skip items if they have not data itself', () => {
        const extractTransformer = new ExtractTransformer({});
        const inputData = [
            {data: {id: 1, title: 'some-title1', foo: 'some-foo1'}},
            {another: 'some-value'}
        ];

        assert.deepEqual(extractTransformer.run(inputData), [{id: 1, title: 'some-title1'}]);
    });
});