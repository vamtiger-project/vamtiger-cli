'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class UiIgnoreCss {
    constructor({htmlSource, htmlDestination}) {
        this._html = null;
        this.html = {htmlSource, htmlDestination};

        this.ignoreCss = this._ignoreCss;
    }

    _handleError(error) {
        throw error;
    }

    set html({htmlSource, htmlDestination}) {
        this._html = {
            source: htmlSource,
            destination: htmlDestination
        };
    }

    get html() {
        return this._html;
    }

    get main() {
        const main = this.setDependancies
            .then(() => this.tasks)
            .then(() => null)
            .catch(this._handleError);

        return main;
    }

    get _ignoreCss() {
        const _ignoreCss = {
            source: null,
            destination: null
        }

        return _ignoreCss;
    }

    get setDependancies() {
        const setDependancies = this._setIgnoreCssSource
            .then(() => this._setIgnoreCssDestination)
            .catch(this._handleError);

        return setDependancies;
    }

    get _setIgnoreCssSource() {
        const parameters = {
                filePath: this.html.source,
                buffer: null,
                includeAll: true
            },
            setIgnoreCssSource = vamtiger.get.fileData(this.html.source, true)
                .then(sourceHtml => parameters.buffer = sourceHtml.fileData)
                .then(() => vamtiger.get.cssFiles(parameters))
                .then(cssFiles => cssFiles.find(cssFile => XRegExp.match(cssFile, vamtiger.regex.uiIgnoreCss)))
                .then(sourceIgnoreCss => this.ignoreCss.source = sourceIgnoreCss)
                .catch(this._handleError);

        return setIgnoreCssSource;
    }

    get _setIgnoreCssDestination() {
        const match = XRegExp.exec(this.ignoreCss.source, vamtiger.regex.uiIgnoreCssMain),
            uiIgnoreCssMainPath = match ? match.uiIgnoreCssMain : null,
            ignoreCssDestination = uiIgnoreCssMainPath ? path.resolve(
                this.html.destination,
                '..',
                uiIgnoreCssMainPath
            ) : null;

        this.ignoreCss.destination = ignoreCssDestination;
    }

    get tasks() {
        const tasks = Promise.all([
            vamtiger.bundle.cssFile(this.ignoreCss)
        ]);

        return tasks;
    }
}

exports.main = uiHtmlSourcePath => new UiIgnoreCss(uiHtmlSourcePath).main;