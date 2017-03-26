'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class Component {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;

        this._sourceHtml = null;
        this._previewHtml = null;
    }
    
    main() {
        const main = this.bundleComponentPreviewHtml
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    set sourceHtml(sourceHtml) {
        this._sourceHtml = sourceHtml.fileData;

        this.previewHtml = XRegExp.replace(this._sourceHtml, vamtiger.regex.uiStylesheet, '');
    }

    get sourceHtml() {
        return this._sourceHtml;
    }

    set previewHtml(sourceHtml) {
        const match = XRegExp.exec(sourceHtml, vamtiger.regex.componentPreviewHtml),
            bodyHtmlMatch = XRegExp.exec(sourceHtml, vamtiger.regex.bodyInnerHtml),
            prefix = match.prefix.trim(),
            suffix = match.suffix.trim(),
            customElementHtml = vamtiger.get.customElementHtml({
                html: sourceHtml
            });

        if (match)
            this._previewHtml = `${prefix}\n    ${this.previewScriptHtml}\n${suffix}`
                .replace(bodyHtmlMatch.bodyInnerHtml, customElementHtml);
    }

    get previewHtml() {
        return this._previewHtml;
    }

    get previewScriptHtml () {
        const previewScriptHtml = [
            `<link rel="stylesheet" href="Css/index.css">`,
            `<script src="Js/index.js"></script>`
        ].join('\n\n    ');

        return previewScriptHtml
    }

    get bundleComponentPreviewHtml() {
        const bundleComponentPreviewHtml = vamtiger.get.fileData(this.source)
            .then(sourceHtml => this.sourceHtml = sourceHtml)
            .then(() => this.createPreviewHtml)
            .catch(this._handleError);

        return bundleComponentPreviewHtml;
    }

    get createPreviewHtml() {
        return new Promise(resolve => {
            const previewHtmlFile = vamtiger.get.writeStream(this.destination)
                .on('finish', resolve)
                .on('error', this._handleError);

            previewHtmlFile.write(this.previewHtml);
            previewHtmlFile.end();
        });
    }
}

module.exports = parameters => new Component(parameters).main();