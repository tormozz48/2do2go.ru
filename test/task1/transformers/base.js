'use strict';

const BaseTransformer = require('../../../src/task1/transformers/base');

describe('src/task1/transformers/base', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => sandbox.restore());

    it('should have static factory method', () => {
        assert.instanceOf(BaseTransformer.create(), BaseTransformer);
    });

    it('should parse options on init', () => {
        sandbox.stub(BaseTransformer.prototype, 'parseOptions');
        new BaseTransformer({foo: 'bar'});

        assert.calledOnce(BaseTransformer.prototype.parseOptions);
        assert.calledWithExactly(BaseTransformer.prototype.parseOptions, {foo: 'bar'});
    });

    it('should leave given data as-is', () => {
        const baseTransformer = new BaseTransformer({});
        
        assert.deepEqual(baseTransformer.run({foo: 'bar'}), {foo: 'bar'});
    });

    describe('run', () => {
        it('should transform given data', () => {
            const transformStub = sandbox.stub(BaseTransformer.prototype, 'transform');

            const baseTransformer = new BaseTransformer({});
            baseTransformer.run('some-data');

            assert.calledOnce(transformStub);
            assert.calledWithExactly(transformStub, 'some-data');
        });

        it('should run next transformer', () => {
            const firstTransformer = new BaseTransformer({});
            const secondTransformer = new BaseTransformer({});

            sandbox.stub(firstTransformer, 'transform').returnsArg(0);
            sandbox.stub(secondTransformer, 'transform').returnsArg(0);

            firstTransformer.next(secondTransformer);
            firstTransformer.run('some-data');

            assert.calledOnce(firstTransformer.transform);
            assert.calledOnce(secondTransformer.transform);
        });

        it('should return transformed data if there no next steps', () => {
            const firstTransformer = new BaseTransformer({});
            const secondTransformer = new BaseTransformer({});

            sandbox.stub(firstTransformer, 'transform').returnsArg(0);
            sandbox.stub(secondTransformer, 'transform').returnsArg(0);

            firstTransformer.next(secondTransformer);
            assert.equal(firstTransformer.run('some-data'), 'some-data');
        });
    });
});