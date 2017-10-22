'use strict';

const chai = require('chai');

global.sinon = require('sinon');
global.assert = chai.assert;

global.sinon.assert.expose(chai.assert, {prefix: ''});

chai.use(require('sinon-chai'));
