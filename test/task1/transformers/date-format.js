'use strict';

const {DateFormatTransformer} = require('../../../src/task1/transformers');

describe('src/task1/transformers/date-format', () => {
    let clock = null;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => clock.restore());

    it('should return unmodified data if date fields were not configured', () => {
        const dateFormatTransformer = new DateFormatTransformer({});
        const inputData = [
            {foo: 1508659880.0, bar: 'some-bar1'},
            {foo: 1508653480.0, bar: 'some-bar2'}
        ];

        assert.deepEqual(dateFormatTransformer.run(inputData), inputData);
    });

    it('should format date values for configured fields', () => {
        const dateFormatTransformer = new DateFormatTransformer({date: {fields: ['foo']}});
        const inputData = [
            {foo: 1508659880.0, bar: 'some-bar1'},
            {foo: 1508653480.0, bar: 'some-bar2'}
        ];

        assert.deepEqual(
            dateFormatTransformer.run(inputData), 
            [
                {foo: '22.10.2017 08:11:20', bar: 'some-bar1'},
                {foo: '22.10.2017 06:24:40', bar: 'some-bar2'}
            ]
        );
    });

    it('should use custom date format', () => {
        const dateFormatTransformer = new DateFormatTransformer({
            date: {
                fields: ['foo'],
                format: 'DD.MM.YYYY'
            }
        });
        const inputData = [
            {foo: 1508659880.0, bar: 'some-bar1'},
            {foo: 1508653480.0, bar: 'some-bar2'}
        ];

        assert.deepEqual(
            dateFormatTransformer.run(inputData), 
            [
                {foo: '22.10.2017', bar: 'some-bar1'},
                {foo: '22.10.2017', bar: 'some-bar2'}
            ]
        );
    });
});