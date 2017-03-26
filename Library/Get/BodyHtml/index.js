'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class BodyInnerHtml extends Vamtiger {
    constructor({buffer, bodyInnerHtml}) {
        super();
        
        this._buffer = buffer;
        this._bodyInnerHtml = bodyInnerHtml;

        this.html = '';
    }
    
    main() {
        return new Promise((resolve, reject) => {
            const match = XRegExp.exec(this.documentHtml, this.regex.bodyInnerHtml);
        
            if (match)
                this.html = this._bodyInnerHtml ? match.bodyInnerHtml.trim() : match.bodyOutterHtml;

            resolve(this.html);
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