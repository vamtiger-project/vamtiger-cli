'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger(),
    
    boilerPlateCss = path.resolve(__dirname, 'Boilerplate/index.css');

class ComponentPreviewCss {
    constructor({htmlSource, htmlDestination}) {
        this.htmlSource = htmlSource;
        this.htmlDestination = htmlDestination;
        this._html = null;
        this._cssBoilerplate = null;
    }

    get main() {
        const main = this.componentPreviewCss
            .then(() => this.bundle)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get componentPreviewCss() {
        const componentPreviewCss = vamtiger.get.fileData(this.htmlSource)
            .then(html => this.html = html.fileData)
            .then(() => vamtiger.get.fileData(boilerPlateCss))
            .then(cssBoilerplate => this._cssBoilerplate = cssBoilerplate.fileData)
            .catch(this._handleError);

        return componentPreviewCss;
    }

    set html(htmlText) {
        this._html = htmlText;
    }

    get html() {
        return this._html;
    }

    get css() {
        const selector = vamtiger.get.customElementName({
                html: this.html
            }),
            css = `${selector} ${this._cssBoilerplate}`;

        return css
    }

    get bundlePath() {
        const bundlePath = path.resolve(
            path.dirname(this.htmlDestination),
            'Css/index.css'
        );

        return bundlePath;
    }

    get bundle() {
        return new Promise(resolve => {
            const bundleFile = vamtiger.get.writeStream(this.bundlePath)
                .on('finish', resolve)
                .on('error', this._handleError);

            bundleFile.write(this.css);

            bundleFile.end();
        });
    }
}

module.exports = parameters => new ComponentPreviewCss(parameters).main;