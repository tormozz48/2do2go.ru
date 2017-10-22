module.exports = {
    env: {
        mocha: true
    },

    globals: {
        assert: false,
        sinon: false
    },
    plugins: [
        'mocha'
    ],
    rules: {
        'no-useless-escape': 'off',
        'object-curly-newline': 'off',
        'require-jsdoc': 'off',
        'no-new': 'off'
    }
};