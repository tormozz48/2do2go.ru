'use strict';

const _ = require('lodash');
const transformers = require('../../src/task1/transformers');

describe('transformers', () => {

    describe('parseTransformer', () => {
        let parseTransformer;

        beforeEach(() => {
            parseTransformer = transformers.parseTransformer({dataKey: 'foo.bar'});
        });

        it('should parse JSON and return data for given "dataKey"', () => {
            const data = JSON.stringify({
                foo: {
                    bar: ['item1', 'item2']
                }
            });
            expect(parseTransformer(data)).to.eql(['item1', 'item2']);
        });

        it('should return empty array on JSON parse error', () => {
            expect(parseTransformer()).to.eql([]);
        });

        it('should return empty array if data was not found for given "dataKey"', () => {
            const data = JSON.stringify({someKey: 'some-value'});
            expect(parseTransformer(data)).to.eql([]);
        });
    });

    describe('extractTransformer', () => {
        it('should left only passed fields', () => {
            let transformer = transformers.extractTransformer({fields: ['field1']});
            const data = [{
                data: {
                    field1: 'some-value1',
                    field2: 'some-value2'
                }
            }];

            expect(transformer(data)).eql([{field1: 'some-value1'}]);
        });
    });

    describe('sortTransformer', () => {
        let data;

        beforeEach(() => {
            data = [
                {field1: 3, field2: 'some-value23'},
                {field1: 1, field2: 'some-value21'},
                {field1: 2, field2: 'some-value22'}
            ];
        });

        it('should sort data by given field and "asc" direction', () => {
            let transformer = transformers.sortTransformer({field: 'field1', direction: 'asc'});

            expect(transformer(data)).eql([
                {field1: 1, field2: 'some-value21'},
                {field1: 2, field2: 'some-value22'},
                {field1: 3, field2: 'some-value23'}
            ]);
        });

        it('should sort data by given field and "desc" direction', () => {
            let transformer = transformers.sortTransformer({field: 'field1', direction: 'desc'});

            expect(transformer(data)).eql([
                {field1: 3, field2: 'some-value23'},
                {field1: 2, field2: 'some-value22'},
                {field1: 1, field2: 'some-value21'}
            ]);
        });
    });

    describe('dateFormatTransformer', () => {
        it('should return source data as is if "dateFields" option was not set', () => {
            const data = [{field1: 1, field2: '1423023706'}];
            expect(transformers.dateFormatTransformer({})(data))
                .eql(data);
        });

        it('should convert date fields into default format', () => {
            const data = [{field1: 1, field2: '1423023706'}];
            expect(transformers.dateFormatTransformer({dateFields: ['field2']})(data))
                .eql([
                    {
                        field1: 1,
                        field2: '04.02.2015 07:21:46'
                    }
                ]);
        });

        it('should convert date fields into given format', () => {
            const data = [{field1: 1, field2: '1423023706'}];
            const options = {dateFields: ['field2'], dateFormat: 'DD.MM.YYYY'};
            expect(transformers.dateFormatTransformer(options)(data))
                .eql([
                    {
                        field1: 1,
                        field2: '04.02.2015'
                    }
                ]);
        });
    });

    describe('outputJSONTransformer', () => {
        const data = [{field1: 1, field2: 'some-value21'}];

        it('should create valid JSON output', () => {
            expect(transformers.outputJSONTransformer({})(data))
                .equal('[{\"field1\":1,\"field2\":\"some-value21\"}]');
        });

        it('should use custom "spaces" value for JSON formatting', () => {
            expect(transformers.outputJSONTransformer({spaces: 4})(data))
                .equal('[\n    {\n        \"field1\": 1,\n        \"field2\": \"some-value21\"\n    }\n]');
        });
    });

    describe('outputCSVTransformer', () => {
        const data = [{field1: 1, field2: 'some-value21'}];

        it('should use "," delimiter by default', () => {
            expect(transformers.outputCSVTransformer({})(data))
                .equal('\"1\",\"some-value21\"');
        });

        it('should use custom delimiter', () => {
            expect(transformers.outputCSVTransformer({delimiter: '||'})(data))
                .equal('\"1\"||\"some-value21\"');
        });

        it('should use insert column headers into first row if "addHeader" option enabled', () => {
            expect(transformers.outputCSVTransformer({addHeader: true})(data))
                .equal('field1,field2\r\n\"1\",\"some-value21\"');
        });
    });

    describe('outputSQLTransformer', () => {
        const data = [{field1: 1, field2: 'some-value21'}];

        it('should create valid sql scripts', () => {
            expect(transformers.outputSQLTransformer({table: 'some-table'})(data))
                .equal('insert into \"some-table\" (\"field1\", \"field2\") values (1, \'some-value21\');');
        });

        it('should use table name "table" by default', () => {
            expect(transformers.outputSQLTransformer({})(data))
                .equal('insert into \"table\" (\"field1\", \"field2\") values (1, \'some-value21\');');
        });
    });
});
