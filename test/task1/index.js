'use strict';

const path = require('path');
const fs = require('fs');

const task1 = require('../../src/task1');
const content = fs.readFileSync(path.join(process.cwd(), 'test', 'fixtures', 'data.json'), 'utf-8');

const result = task1(content,
    {
        field: 'score',
        direction: 'asc'
    },
    {
        type: 'json'
    }
);

console.log(result);
