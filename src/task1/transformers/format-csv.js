'use strict';

const BaseTransformer = require('./base');

/**
 * Здесь можно было бы использовать какой-либо из существующих модулей
 * для конвертации в csv формат, но очень хотелось иметь именно синхронный код
 * а все найденные мной модули были асинхронные.
 */

/**
 * Sync transformer from JSON to CSV format
 * @type {CSVFormatTransformer}
 */
module.exports = class CSVFormatTransformer extends BaseTransformer {
    /**
     * Performs transformation on given data
     * @param {Object[]} data
     */
    run(data) {
        data = this.baseTransformer.run(data);

        const delimiter = this.options.delimiter || ',';
        const fields = Object.keys(data[0]);
        const csv = data.map((row) => {
            return fields
                .map((fieldName) => `"${row[fieldName]}"`)
                .join(delimiter);
        });

        if(this.options.addHeader) {
            csv.unshift(fields);
        }
        return csv.join('\r\n');
    }
};
