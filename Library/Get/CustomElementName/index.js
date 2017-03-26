'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class CustomElementName {
    constructor({html}) {
        this._html = html;
    }

    get html() {
        const html = Buffer.isBuffer(this._html) ? this._htmlFromBuffer : this._html;

        return html;
    }

    get _htmlFromBuffer() {
        const html = this._html.contents ? this._html.contents.toString() : this._html.toString();

        return html;
    }

    get main() {
        return this.customElementName;
    }

    get customElementName() {
        const match = XRegExp.exec(this.html, vamtiger.regex.htmlTitle),
            customElementName = match ? vamtiger.get.lowercaseDashed(match.titleText) : '';

        return customElementName;
    }
}

module.exports = parameters => new CustomElementName(parameters).main;