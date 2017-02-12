'use strict';

const rollup = require('rollup').rollup;

class JsBundle {
    constructor({filePath, legacy = false}) {
        this.filePath = filePath;
        this.legacy = legacy;

        this.bundle = '';
    }

    main() {
        return new Promise((resolve, reject) => {
            rollup(this._config)
                .then(result => this.result = result.generate(this._config))
                .then(() => this.bundle = this.result)
                .then(() => resolve(this))
                .catch(this._handleError);
        });
    }

    _handleError(error) {
        throw error;
    }

    get _config() {
        const config = {
            entry: this.filePath,
            sourceMap: 'inline',
            acorn: {
                allowReserved: true
            }
        };

        return config;
    }

    get code() {
        return this.bundle.code;
    }

    get sourceMap() {
        let sourceMap = null;

        if (this.bundle.map)
            sourceMap = this.bundle.map;
        
        return sourceMap;
    }
}

module.exports = fileData => new JsBundle(fileData).main();