'use strict';

/* eslint no-console: 0*/

const got = require('got');
const dataProcessor = require('../task1');

module.exports = (req, res) => {
    const {url} = req.body; 

    // TODO распарсить опции и параметры вывода из формы

    return got.get(url)
        .then((response) => response.body)
        .then((jsonData) => dataProcessor(jsonData, {}, {type: 'csv'}))
        .then((result) => res.send(result))
        .catch((error) => {
            console.error(error.stack || error.message);
            res.send(error);
        });
};