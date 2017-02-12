'use strict';

const babel = require('babel-core'),
    es2015 = require('babel-preset-es2015'),
    es2016 = require('babel-preset-es2016'),
    es2017 = require('babel-preset-es2017'),
    strictMode = require('babel-plugin-transform-strict-mode'),
    formatJs = require('js-beautify').js_beautify;

class TranspiledJs {
    constructor({jsBundle, transpile}) {
        this.jsBundle = jsBundle;
        this.transpile = transpile;

        this.transpiledJs = null;
    }

    main() {
        this.transpiledJs = babel.transform(this.jsBundle.code, this._config);

        return this;
    }

     get _presets() {
        const presets = [];

        if (this.jsBundle.legacy)
            presets.unshift(es2015);

        if (this.transpile) {
            presets.push(es2016);
            presets.push(es2017);
        }

        return presets;
    }

    get _plugins() {
        const plugins = [
            strictMode
        ];

        return plugins;
    }

    get _config() {
        const config = {
            presets: this._presets,
            plugins: this._plugins,
            sourceMaps: true,
            inputSourceMap: this.jsBundle.sourceMap
        };

        return config;
    }

    get code() {
        const code = formatJs(this.transpiledJs.code);

        return code;
    }

    get sourceMap() {
        let sourceMap = '';

        if (this.transpiledJs.map)
            sourceMap = `//# sourceMappingURL=${this.transpiledJs.map.toUrl()}`;
        
        return sourceMap;
    } 
}

module.exports = fileData => new TranspiledJs(fileData).main();