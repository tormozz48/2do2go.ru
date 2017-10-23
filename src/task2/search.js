'use strict';

/* eslint no-console: 0*/

const got = require('got');
const dataProcessor = require('../task1');

module.exports = (req, res) => {
    const {url, output} = req.body; 

    // TODO распарсить опции и параметры вывода из формы

    return got.get(url)
        .then((response) => response.body)
        .then((jsonData) => dataProcessor(jsonData, {}, output))
        .then((result) => res.send(result))
        .catch((error) => {
            console.error(error.stack || error.message);
            res.send(error);
        });
};