'use strict';

const transformers = require('../../src/task1/transformers');
const dataTransformer = require('../../src/task1/index');

describe('src/task1/index', () => {
    const sandbox = sinon.sandbox.create();

    const createTransformerStub = (runSpy = sinon.spy()) => {
        return {
            next: sinon.stub().returnsThis,
            run: runSpy
        }
    };

    beforeEach(() => {
        sandbox.stub(transformers, 'JSONParseTransformer').returns(createTransformerStub());
        sandbox.stub(transformers, 'SortTransformer');
        sandbox.stub(transformers, 'ExtractTransformer');
        sandbox.stub(transformers, 'DateFormatTransformer');
        sandbox.stub(transformers, 'AggregateTransformer');
        sandbox.stub(transformers, 'OutputTransformer');
    });

    afterEach(() => sandbox.restore());

    it('should initialize "JSONParseTransformer"', () => {
        const options = {}
        dataTransformer('', options, {});

        assert.calledWithNew(transformers.JSONParseTransformer);
        assert.calledWith(transformers.JSONParseTransformer, options);
    });

    it('should initialize "SortTransformer"', () => {
        const options = {}
        dataTransformer('', options, {});

        assert.calledWithNew(transformers.SortTransformer);
        assert.calledWith(transformers.SortTransformer, options);
    });

    it('should initialize "ExtractTransformer"', () => {
        const options = {}
        dataTransformer('', options, {});

        assert.calledWithNew(transformers.ExtractTransformer);
        assert.calledWith(transformers.ExtractTransformer, options);
    });

    it('should initialize "DateFormatTransformer"', () => {
        const options = {}
        dataTransformer('', options, {});

        assert.calledWithNew(transformers.DateFormatTransformer);
        assert.calledWith(transformers.DateFormatTransformer, options);
    });

    it('should initialize "AggregateTransformer"', () => {
        const options = {}
        dataTransformer('', options, {});

        assert.calledWithNew(transformers.AggregateTransformer);
        assert.calledWith(transformers.AggregateTransformer, options);
    });

    it('should initialize "OutputTransformer"', () => {
        const output = {}
        dataTransformer('', {}, output);

        assert.calledWithNew(transformers.OutputTransformer);
        assert.calledWith(transformers.OutputTransformer, output);
    });

    it('should launch data transformation', () => {
        const runSpy = sinon.spy();
        transformers.JSONParseTransformer.returns(createTransformerStub(runSpy));

        const data = JSON.stringify({});
        dataTransformer(data, {}, {});

        assert.calledOnce(runSpy);
        assert.calledWith(runSpy, data);
    });
});
