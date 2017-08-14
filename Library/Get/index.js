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

    static get bodyHtml() {
        const bodyHtml = require('./BodyHtml');

        return bodyHtml;
    }

    static get cssFiles() {
        const cssFiles = require('./CssFiles');

        return cssFiles;
    }

    static get ignoreCss() {
        const ignoreCss = require('./IgnoreCss');

        return ignoreCss;
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

    static get customElementHtml() {
        const customElementHtml = require('./CustomElementHtml');

        return customElementHtml;
    }

    static get lowercaseDashed() {
        const lowercaseDashed = require('./LowercaseDashed');

        return lowercaseDashed;
    }

    static get customElementName() {
        const customElementName = require('./CustomElementName');

        return customElementName;
    }

    static get componentName() {
        const componentName = require('./ComponentName');

        return componentName;
    }

    static get jsSourceFiles() {
        const jsSourceFiles = require('./JsSourceFiles');

        return jsSourceFiles;
    }

    static get jsSouceFolders() {
        const jsSouceFolders = require('./JsSouceFolders');

        return jsSouceFolders;
    };

    static get jsSourceEntryPaths() {
        const jsSourceEntryPaths = require('./JsSourceEntryPaths');

        return jsSourceEntryPaths;
    }

    static get pathsWhichDontExist() {
        const pathsWhichDontExist = require('./PathsWhichDontExist');

        return pathsWhichDontExist;
    }
}

module.exports = Get;