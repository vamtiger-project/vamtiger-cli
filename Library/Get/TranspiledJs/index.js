'use strict';

const babel = require('babel-core'),
    es2015 = require('babel-preset-es2015'),
    es2016 = require('babel-preset-es2016'),
    es2017 = require('babel-preset-es2017'),
    strictMode = require('babel-plugin-transform-strict-mode'),
    formatJs = require('js-beautify').js_beautify;

class TranspiledJs {
    constructor(paramaters) {
        this.jsBundle = paramaters.jsBundle ? paramaters.jsBundle : paramaters._jsBundle;
        this.transpile = paramaters.transpile;
        this.codeOnly = paramaters.codeOnly;

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
        let sourceMap,
            sourceMapUrl;

        if (this.codeOnly)
            sourceMapUrl = '';
        else {
            sourceMap = this.transpiledJs.map.toUrl(),
            sourceMapUrl = sourceMap ? `//# sourceMappingURL=${sourceMap}` : '';
        }

        return sourceMapUrl;
    } 
}

module.exports = fileData => new TranspiledJs(fileData).main();