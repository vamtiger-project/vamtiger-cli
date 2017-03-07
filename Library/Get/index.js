'use strict';

class Get {
    static get readStream() {
        const readStream = require('./ReadStream');

        return readStream;
    }

    static get writeStream() {
        const writeStream = require('./WriteStream');

        return writeStream;
    }

    static get fileData() {
        const fileData = require('./FileData');

        return fileData;
    }

    static get folderContent() {
        const folderContent = require('./FolderContent');

        return folderContent;
    }

    static get pathInfo() {
        const pathInfo = require('./PathInfo');

        return pathInfo;
    }

    static get customElement() {
        const customElement = require('./CustomElement');

        return customElement;
    }

    static get transpiledJs() {
        const transpiledJs = require('./TranspiledJs');

        return transpiledJs;
    }

    static get jsBundle() {
        const jsBundle = require('./JsBundle');

        return jsBundle;
    }

    static get cssBundle() {
        const cssBundle = require('./CssBundle');

        return cssBundle;
    }

    static get cssBundles() {
        const cssBundles = require('./CssBundles');

        return cssBundles;
    }

    static get bodyInnerHtml() {
        const bodyInnerHtml = require('./BodyInnerHtml');

        return bodyInnerHtml;
    }

    static get cssFiles() {
        const cssFiles = require('./CssFiles');

        return cssFiles;
    }

    static get customElementBoilerplate() {
        const customElementBoilerplate = require('./CustomElementBoilerplate').main;

        return customElementBoilerplate;
    }

    static get pollyiflledCustomElementBoilerplate() {
        const pollyiflledCustomElementBoilerplate = require('./PollyiflledCustomElementBoilerplate');

        return pollyiflledCustomElementBoilerplate;
    }

    static get camelCase() {
        const camelCase = require('./CamelCase');

        return camelCase;
    }

    static get prefixedSelectorCss() {
        const prefixedSelectorCss = require('./PrefixedSelectorCss');

        return prefixedSelectorCss;
    }

    static get regex() {
        const regex = require('./Regex');

        return regex;
    }
}

module.exports = Get;