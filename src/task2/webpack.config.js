'use strict';

/* eslint no-undef: 0*/

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [path.join(__dirname, '/client/index.js')],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()    
    ],
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