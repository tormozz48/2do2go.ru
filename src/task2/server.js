'use strict';

/* eslint no-undef: 0*/
/* eslint no-console: 0*/
/* eslint no-process-env: 0*/

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const express = require('express');

const search = require('./search');

const port = process.env.PORT || 3000;

const publicFolder = path.resolve(__dirname, 'public');
const app = express();

app.use(morgan('common'));
app.use(serveStatic(publicFolder));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/search', search);

app.listen(port, () => console.log(`running on localhost:${port}`));