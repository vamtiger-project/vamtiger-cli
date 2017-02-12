'use strict';

const postcss = require('postcss'),
    cssnano = require('cssnano'),
    cssNext = require('postcss-cssnext'),
    atImport = require('postcss-import');

class CssBundle {
    constructor({filePath, buffer}) {
        this.filePath = filePath;
        this._buffer = buffer,

        this.bundle = '';

        this.config = this._config;

        this.bundle = '';
    }

    main() {
        return new Promise((resolve, reject) => {
            postcss(this.config.processors)
                .process(this.buffer, this.config.process)
                .then(result => this.bundle = result)
                .then(() => resolve(this))
                .catch(this._handleError);
        });
    }

    _handleError(error) {
        throw error;
    }

    get buffer() {
        let buffer = this._buffer;
        
        if (buffer.contents)
            buffer = this._buffer.contents;

        return buffer;
    }

    get css() {
        return this.bundle.css;
    }

    get _config() {
        const config = {
            processors: this._processors,
            process: this._process,
        };

        return config;
    }

    get _cssNano() {
        const config = {
                autoprefixer: false     
            },
            cssNano = cssnano(config);

        return cssNano;
    }

    get _processors() {
        const processors = [
            atImport(),
            cssNext(),
            this._cssNano
        ];

        return processors;
    }

    get _process() {
        const process = {
            from: this.filePath,
            map: {
                inline: true
            }
        }

        return process;
    }
}

module.exports = fileData => new CssBundle(fileData).main();