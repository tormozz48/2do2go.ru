'use strict';

const _ = require('lodash');
const BaseTransformer = require('../base');

/**
 * @class CSVOutputTransformer
 * @extends {BaseTransformer}
 */
class CSVOutputTransformer extends BaseTransformer {
    parseOptions(options) {
        return _.defaults(options, {delimiter: 0, addHeader: false});
    }

    transform(data) {
        const fields = Object.keys(data[0]);
        const csv = data.map((row) => {
            return fields
                .map((fieldName) => `"${row[fieldName]}"`)
                .join(this._options.delimiter);
        });

        if(this._options.addHeader) {
            csv.unshift(fields);
        }
        return csv.join('\r\n');
    }
}

module.exports = CSVOutputTransformer;