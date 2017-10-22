'use strict';

const OutputTransformer = require('../../../../src/task1/transformers/output');
const CSVOutputTransformer = require('../../../../src/task1/transformers/output/csv');
const JSONOutputTransformer = require('../../../../src/task1/transformers/output/json');
const SQLOutputTransformer = require('../../../../src/task1/transformers/output/sql');

describe('src/task1/transformers/output', () => {
    const sandbox = sinon.sandbox.create();

    beforeEach(() => {
        sandbox.stub(CSVOutputTransformer.prototype, 'transform').returnsArg(0);
        sandbox.stub(JSONOutputTransformer.prototype, 'transform').returnsArg(0);
        sandbox.stub(SQLOutputTransformer.prototype, 'transform').returnsArg(0);
    });

    afterEach(() => sandbox.restore());
    
    it('should properly use csv format', () => {
        const outputTransformer = new OutputTransformer({type: 'csv'});
        outputTransformer.run({foo: 'bar'});

        assert.calledOnce(CSVOutputTransformer.prototype.transform);
        assert.calledWithExactly(CSVOutputTransformer.prototype.transform, {foo: 'bar'});
    });

    it('should properly use json format', () => {
        const outputTransformer = new OutputTransformer({type: 'json'});
        outputTransformer.run({foo: 'bar'});

        assert.calledOnce(JSONOutputTransformer.prototype.transform);
        assert.calledWithExactly(JSONOutputTransformer.prototype.transform, {foo: 'bar'});
    });

    it('should properly use sql format', () => {
        const outputTransformer = new OutputTransformer({type: 'sql'});
        outputTransformer.run({foo: 'bar'});

        assert.calledOnce(SQLOutputTransformer.prototype.transform);
        assert.calledWithExactly(SQLOutputTransformer.prototype.transform, {foo: 'bar'});
    });

    it('should use json format by default', () => {
        const outputTransformer = new OutputTransformer({});
        outputTransformer.run({foo: 'bar'});

        assert.calledOnce(JSONOutputTransformer.prototype.transform);
        assert.calledWithExactly(JSONOutputTransformer.prototype.transform, {foo: 'bar'});
    });

    it('should pass advanced options into formatter', () => {
        sandbox.stub(JSONOutputTransformer, 'create').returns({transform: sinon.stub()});

        const outputTransformer = new OutputTransformer({spaces: 2});
        outputTransformer.run({foo: 'bar'});

        assert.calledWithExactly(JSONOutputTransformer.create, {spaces: 2, type: 'json'});
    });
});