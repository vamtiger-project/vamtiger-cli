'use strict';

const path = require('path'),
    through = require('through2'),
    document = require('jsdom').jsdom,

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class CustomElement extends Vamtiger {
    constructor(htmlPath) {
        super();

        this._regex = this.__regex;

        this.basePath = path.dirname(htmlPath);

        this.document = null;
        this.window = null;
        this.html = null;
        this.css = null;
        this.js = null;
        this._customElement = null;
        this.customElement = null;
        this.buffer = null;
        this.stream = null;

        this._transform = this._transform.bind(this);
        this._end = this._end.bind(this);
    }

    main() {
        this.stream = through.obj(this._transform, this._end);

        return this.stream;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;

        this.html = this._html;

        this.document = document(this.html);
        this.window = this.document.defaultView;

        this.getFileData()
            .then(fileData => this.setFileData(fileData))
            .then(() => this.get.customElement(this))
            .then(customElement => this.customElement = customElement)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        this.stream.push(this.customElement);

        done();
    }

    _localScript(script) {
        const scriptUrl = script.src ? script.src : script.href;

        let localScript = true;

        if (scriptUrl.match(this.__regex.remoteUrl))
            localScript = false;

        return localScript;
    }

    getFileData() {
        return new Promise((resolve, reject) => {
            const scripts = this._localScripts,
                scriptPaths = scripts.map(script => path.resolve(this.basePath, script.href ? script.href : script.src)),
                getScriptData = Promise.all(
                    scriptPaths
                        .map(scriptPath => this.get.fileData(scriptPath))
                );

            getScriptData
                .then(resolve)
                .catch(reject);
        });
    }

    setFileData(fileData) {
        fileData.forEach(data => {
            if (this.hasOwnProperty(data.fileType)) {
                this[data.fileType] = this[data.fileType] ? this[data.fileType] + data.fileData : data.fileData;
            }
        });

        this.html = this.document.body.innerHTML;
    }

    get __regex() {
        const regex = {
            remoteUrl: new RegExp('https://')
        };

        return regex;
    }

    get _localScripts() {
        const query = [
            'link[rel="stylesheet"]',
            'script'
        ].join(','),
            localScripts = Array.from(this.document.querySelectorAll(query))
                .filter(script => this._localScript(script));

        return localScripts;
    }

    get _html() {
        const html = this.isNativeBuffer ?
            this.buffer.toString()
            :
            this.buffer.contents.toString();

        return html;
    }

    get isNativeBuffer() {
        let isNativeBuffer = true;

        if (this.buffer.contents)
            isNativeBuffer = false;

        return isNativeBuffer;
    }

    get webComponentConfig() {
        const webComponentConfig = {},
            style = this.document.createElement('style'),
            script = this.document.createElement('script');

        style.cssText = this.css;
        script.textContent = this.js;

        webComponentConfig.style = style.outerHTML;
        webComponentConfig.script = script.outerHTML;
        webComponentConfig.html = this.document.body.firstElementChild.outerHTML;
    }

    get webComponentConfig() {
        const webComponentConfig = {}
    }

    get customElement() {
        return this._customElement;
    }

    set customElement(customElement) {
        if (customElement && !this.isNativeBuffer) {
            this.buffer.contents = new Buffer(customElement);
            customElement = this.buffer;
        }

        this._customElement = customElement;
    }
}

module.exports = htmlPath => new CustomElement(htmlPath).main();