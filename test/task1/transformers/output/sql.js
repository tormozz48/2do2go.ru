'use strict';

const SQLOutputTransformer = require('../../../../src/task1/transformers/output/sql');

describe('src/task1/transformers/output/sql', () => {
    it('should properly create output in sql format', () => {
        const sqlOutputTransformer = new SQLOutputTransformer({});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            sqlOutputTransformer.run(inputData),
            'insert into "table" ("foo", "bar") values (\'some-foo1\', \'some-bar1\');\n' +
            'insert into "table" ("foo", "bar") values (\'some-foo2\', \'some-bar2\');'
        );
    });

    it('should use custom configured table name', () => {
        const sqlOutputTransformer = new SQLOutputTransformer({table: 'some-custom-table'});
        const inputData = [
            {foo: 'some-foo1', bar: 'some-bar1'},
            {foo: 'some-foo2', bar: 'some-bar2'}
        ];

        assert.equal(
            sqlOutputTransformer.run(inputData),
            'insert into "some-custom-table" ("foo", "bar") values (\'some-foo1\', \'some-bar1\');\n' +
            'insert into "some-custom-table" ("foo", "bar") values (\'some-foo2\', \'some-bar2\');'
        );
    });
});