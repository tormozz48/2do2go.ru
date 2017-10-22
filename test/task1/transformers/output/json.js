'use strict';

const JSONOutputTransformer = require('../../../../src/task1/transformers/output/json');

describe('src/task1/transformers/output/json', () => {
    it('should properly create output in json format', () => {
        const jsonOutputTransformer = new JSONOutputTransformer({});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            jsonOutputTransformer.run(inputData),
            '[{"foo":"some-foo1","bar":"some-bar1"},{"foo":"some-foo2","bar":"some-bar2"}]'
        );
    });

    it('should use custom configured "spaces" parameter', () => {
        const jsonOutputTransformer = new JSONOutputTransformer({spaces: 2});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            jsonOutputTransformer.run(inputData),
            '[\n  {\n    "foo": "some-foo1",\n    "bar": "some-bar1"\n  }' +
            ',\n  {\n    "foo": "some-foo2",\n    "bar": "some-bar2"\n  }\n]'
        );
    });
});