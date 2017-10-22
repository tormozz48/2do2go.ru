'use strict';

const CSVOutputTransformer = require('../../../../src/task1/transformers/output/csv');

describe('src/task1/transformers/output/csv', () => {
    it('should properly create output in csv format', () => {
        const csvOutputTransformer = new CSVOutputTransformer({});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            csvOutputTransformer.run(inputData),
            '"some-foo1","some-bar1"\r\n"some-foo2","some-bar2"'
        );
    });

    it('should use custom configured delimiter', () => {
        const csvOutputTransformer = new CSVOutputTransformer({delimiter: '||'});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            csvOutputTransformer.run(inputData),
            '"some-foo1"||"some-bar1"\r\n"some-foo2"||"some-bar2"'
        );
    });

    it('should optionally add fields as header', () => {
        const csvOutputTransformer = new CSVOutputTransformer({addHeader: true});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            csvOutputTransformer.run(inputData),
            'foo,bar\r\n"some-foo1","some-bar1"\r\n"some-foo2","some-bar2"'
        );
    });
});