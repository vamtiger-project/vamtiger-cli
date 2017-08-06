'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),
    rollup = require('rollup').rollup,
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger();

class JsBundle {
    constructor({filePath, legacy = false}) {
        this.filePath = filePath;
        this.legacy = legacy;

        this.bundle = '';

        this.ignore = this._ignore;
    }

    main() {
        return new Promise((resolve, reject) => {
            const main = rollup(this._config)
                    .then(result => this.result = result.generate(this._config))
                    .then(() => this.bundle = this.result)
                    .then(() => resolve(this))
                    .catch(error => this._handleError({error, reject}));
        });
    }

    _handleError(params) {
        const error = params.error,
            reject = params.reject;

        if (reject)
            reject(error);
        else
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

    get _ignore() {
        const ignore = XRegExp.match(this.filePath, vamtiger.regex.pathToIgnore);

        return ignore;
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

    get sourceMapUrl() {
        const sourceMapUrl = `//# sourceMappingURL=${this.sourceMap.toUrl()}`;

        return sourceMapUrl;
    }

    get codeWithSourceMap() {
        const codeWithSourceMap = this.code + this.sourceMapUrl;

        return codeWithSourceMap;
    }
}

module.exports = fileData => new JsBundle(fileData).main();