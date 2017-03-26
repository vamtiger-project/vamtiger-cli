'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class CustomElementHtml {
    constructor({html}) {
        this.html = html;
    }

    get main() {
        return this.customElementHtml;
    }

    get customElementHtml() {
        const match = XRegExp.exec(this.html, vamtiger.regex.htmlTitle),
            customElementName = match ? vamtiger.get.lowercaseDashed(match.titleText) : null,
            customElementHtml = customElementName ? `<${customElementName}></${customElementName}>` : '';

        return customElementHtml;
    }
}

module.exports = parameters => new CustomElementHtml(parameters).main;