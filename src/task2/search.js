'use strict';

/* eslint no-console: 0*/

const got = require('got');
const dataProcessor = require('../task1');

module.exports = (req, res) => {
    const {url, sort, output} = req.body; 

    const options = {
        sort, 
        aggregate: {field: 'domain'},
        extractFields: ['domain', 'score']
    };
    
    return got.get(url)
        .then((response) => response.body)
        .then((jsonData) => dataProcessor(jsonData, options, output))
        .then((result) => res.send(result))
        .catch((error) => {
            console.error(error.stack || error.message);
            res.send(error);
        });
};