'use strict';

/* eslint no-sync: 0*/
/* eslint no-undef: 0*/
/* eslint no-console: 0*/

const fs = require('fs');
const path = require('path');
const got = require('got');
const supertest = require('supertest');
const server = require('../../src/task2/server')({testing: true});

const dataStub = fs.readFileSync(path.join(__dirname, '../fixtures/data.json'));

describe('src/task2/server', () => {
    const sandbox = sinon.sandbox.create();

    before(() => server.start());

    beforeEach(() => {
        sandbox.stub(console, 'error');
        sandbox.stub(got, 'get').resolves({body: dataStub});
    });

    afterEach(() => sandbox.restore());

    after(() => server.stop());

    it('should return 200 status on /', () => {
        return supertest(server.getApp())
            .get('/user')
            .set('Accept', 'text/html')
            .expect(200);
    });

    it('should return 404 error page on invalid url', () => {
        return supertest(server.getApp())
            .get('/some-invalid-url')
            .set('Accept', 'text/html')
            .expect((res) => {
                assert.match(res.text, '<h1>Error 404</h1>');
                assert.match(res.text, '<h3>Page not found</h3>');
            });
    });

    it('should return 500 error page on server internal error', () => {
        got.get.throws(new Error('some unexpected server error'));

        return supertest(server.getApp())
            .post('/search')
            .set('Accept', 'text/html')
            .expect((res) => {
                assert.match(res.text, '<h1>Error 500</h1>');
                assert.match(res.text, '<h3>Internal Server Error</h3>');
            });
    });

    it('should return fetched JSON data on POST /search', () => {
        return supertest(server.getApp())
            .post('/search')
            .set('Accept', 'application/json')
            .expect((res) => {
                res = JSON.parse(res.text);
                assert.lengthOf(res, 8);
            });
    });

    it('should return error object on data fetching error', () => {
        got.get.rejects(new Error('some fetching error'));

        return supertest(server.getApp())
            .post('/search')
            .set('Accept', 'application/json')
            .expect((res) => {
                assert.match(res.text, 'Error: some fetching error');
            });
    });

    it('should log fetching error stack or mesage', () => {
        got.get.rejects(new Error('some fetching error'));

        return supertest(server.getApp())
            .post('/search')
            .set('Accept', 'application/json')
            .expect(() => {
                assert.calledWithMatch(console.error, 'Error: some fetching error');
            });
    });
});