'use strict';

const path = require('path');
const fs = require('fs');

const task1 = require('../../src/task1');
const content = fs.readFileSync(path.join(process.cwd(), 'test', 'fixtures', 'data.json'), 'utf-8');

function exec(options) {
    console.log(options.title);
    console.log(task1(content,
        {
            field: options['sortField'],
            direction: options['sortDirection']
        },
        options.output
    ));

    console.log('\n\n');
}

exec({
    title: 'sort created_utc asc output JSON',
    sortField: 'created_utc',
    sortDirection: 'asc',
    output: {
        type: 'json'
    }
});

exec({
    title: 'sort created_utc asc output JSON with 4 spaces',
    sortField: 'created_utc',
    sortDirection: 'asc',
    output: {
        type: 'json',
        options: {spaces: 4}
    }
});

exec({
    title: 'sort score desc output JSON with 4 spaces',
    sortField: 'score',
    sortDirection: 'desc',
    output: {
        type: 'json',
        options: {spaces: 4}
    }
});

exec({
    title: 'sort score asc output CSV',
    sortField: 'score',
    sortDirection: 'asc',
    output: {
        type: 'csv'
    }
});

exec({
    title: 'sort score asc output CSV with custom delimiter "||"',
    sortField: 'score',
    sortDirection: 'asc',
    output: {
        type: 'csv',
        options: {delimiter: '||'}
    }
});

exec({
    title: 'sort score asc output SQL',
    sortField: 'score',
    sortDirection: 'asc',
    output: {
        type: 'sql',
        table: 'some-db-table'
    }
});

