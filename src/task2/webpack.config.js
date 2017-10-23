'use strict';

/* eslint no-undef: 0*/

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, '/client/index.js')],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [new webpack.NoEmitOnErrorsPlugin()],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['babel-loader']
            }
        ]
    }
}