'use strict';

const {SortTransformer} = require('../../../src/task1/transformers');

describe('src/task1/transformers/sort', () => {
    it('should sort by default configured fields', () => {
        const sortTransformer = new SortTransformer({});
        const inputData = [
            {'created_utc': 2, foo: 'some-foo2'},
            {'created_utc': 1, foo: 'some-foo1'}
        ];

        assert.deepEqual(
            sortTransformer.run(inputData),
            [
                {'created_utc': 1, foo: 'some-foo1'},
                {'created_utc': 2, foo: 'some-foo2'}
            ]
        );
    });

    describe('should use custom sort ', () => {
        it('field', () => {
            const sortTransformer = new SortTransformer({sort: {field: 'foo'}});
            const inputData = [
                {'created_utc': 999, foo: 'some-foo2'},
                {'created_utc': 999, foo: 'some-foo1'}
            ];
    
            assert.deepEqual(
                sortTransformer.run(inputData),
                [
                    {'created_utc': 999, foo: 'some-foo1'},
                    {'created_utc': 999, foo: 'some-foo2'}
                ]
            );
        });
            
        it('direction', () => {
            const sortTransformer = new SortTransformer({sort: {direction: 'desc'}});
            const inputData = [
                {'created_utc': 1, foo: 'some-foo1'},
                {'created_utc': 2, foo: 'some-foo2'}
            ];
    
            assert.deepEqual(
                sortTransformer.run(inputData),
                [
                    {'created_utc': 2, foo: 'some-foo2'},
                    {'created_utc': 1, foo: 'some-foo1'}
                ]
            );
        });
            
        it('field and direction', () => {
            const sortTransformer = new SortTransformer({
                sort: {
                    field: 'foo', 
                    direction: 'desc'
                }
            });
            const inputData = [
                {'created_utc': 999, foo: 'some-foo1'},
                {'created_utc': 999, foo: 'some-foo2'}
            ];
    
            assert.deepEqual(
                sortTransformer.run(inputData),
                [
                    {'created_utc': 999, foo: 'some-foo2'},
                    {'created_utc': 999, foo: 'some-foo1'}
                ]
            );
        });
    })
});