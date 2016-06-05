'use strict';

const _ = require('lodash');
const transformers = require('../../src/task1/transformers');
const task1 = require('../../src/task1');

describe('task1', () => {
    const sandbox = sinon.sandbox.create();
    let data;

    beforeEach(() => {
        data = '{"some-key": "some-value"}';

        sandbox.stub(transformers, 'parseTransformer').returns(_.identity);
        sandbox.stub(transformers, 'extractTransformer').returns(_.identity);
        sandbox.stub(transformers, 'sortTransformer').returns(_.identity);
        sandbox.stub(transformers, 'dateFormatTransformer').returns(_.identity);
        sandbox.stub(transformers, 'outputJSONTransformer').returns(_.identity);
        sandbox.stub(transformers, 'outputCSVTransformer').returns(_.identity);
        sandbox.stub(transformers, 'outputSQLTransformer').returns(_.identity);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should parse source data', () => {
        task1(data);

        expect(transformers.parseTransformer).to.be.calledOnce;
    });

    it('should extract only some of fields', () => {
        task1(data);

        expect(transformers.extractTransformer).to.be.calledOnce;
        expect(transformers.extractTransformer).to.be.calledWith({
            fields: ['id', 'title', 'created_utc', 'score']
        });
    });

    it('should sort data with default sorting params', () => {
        task1(data);

        expect(transformers.sortTransformer).to.be.calledOnce;
        expect(transformers.sortTransformer).to.be.calledWith({
            field: 'created_utc',
            direction: 'asc'
        });
    });

    it('should sort data with given sorting params', () => {
        task1(data, {field: 'some-sort-field', direction: 'desc'});

        expect(transformers.sortTransformer).to.be.calledOnce;
        expect(transformers.sortTransformer).to.be.calledWith({
            field: 'some-sort-field',
            direction: 'desc'
        });
    });

    it('should convert date fields', () => {
        task1(data);

        expect(transformers.dateFormatTransformer).to.be.calledOnce;
        expect(transformers.dateFormatTransformer).to.be.calledWith({
            dateFields: ['created_utc']
        });
    });

    it('should use json formatter by default', () => {
        task1(data);

        expect(transformers.outputJSONTransformer).to.be.calledOnce;
    });

    it('should use csv formatter for csv output type', () => {
        task1(data, {}, {type: 'csv'});

        expect(transformers.outputCSVTransformer).to.be.calledOnce;
    });

    it('should use sql formatter for sql output type', () => {
        task1(data, {}, {type: 'sql'});

        expect(transformers.outputSQLTransformer).to.be.calledOnce;
    });

    it('should pass output options into', () => {
        task1(data, {}, {type: 'sql', options: {table: 'some-table'}});

        expect(transformers.outputSQLTransformer).to.be.calledWith({table: 'some-table'});
    });
});
