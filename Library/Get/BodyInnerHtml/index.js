'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class BodyInnerHtml extends Vamtiger {
    constructor({buffer}) {
        super();
        
        this._buffer = buffer;

        this.innerHtml = '';
    }
    
    main() {
        return new Promise((resolve, reject) => {
            const regexMatch = XRegExp.exec(this.documentHtml, this.regex.bodyInnerHtml);
        
            if (regexMatch)
                this.innerHtml = regexMatch.bodyInnerHtml.trim();

            resolve(this.innerHtml);
        });
    }

    get documentHtml() {
        const documentHtml = this._buffer.contents ? 
            this._buffer.contents.toString()
            :
            this._buffer.toString();

        return documentHtml;
    }
}

module.exports = uiData => new BodyInnerHtml(uiData).main();