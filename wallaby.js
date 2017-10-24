/* eslint global-require: 0*/

module.exports = () => {
    return {
        files: [
            'src/task1/**/*.js',
            'src/task2/{server,search}.js',
            'src/task3/**/*.js'
        ],
        tests: ['test/**/*.js'],
        env: {type: 'node'},
        setup() {
            require('./test/setup');
        },
        debug: true
    };
};