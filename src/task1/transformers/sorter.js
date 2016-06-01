'use strict';

const BaseTransformer = require('./base');

module.exports = class SortTransformer extends BaseTransformer {
    run(data) {
        data = this.baseTransformer.run(data);

        const field = this.options.field;
        const direction = this.options.direction;

        const _direction = {
            'asc': 1,
            'desc': -1
        }[direction];

        return data.sort((a, b) => _direction * (a[field] - b[field]));
    }
};
