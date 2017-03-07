'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class CssFiles extends Vamtiger {
    constructor({filePath, buffer, includeAll}) {
        super();
        
        this.basePath = path.dirname(filePath);
        this._buffer = buffer;

        this.includeAll = includeAll;

        this.cssFiles = new Set();
    }

    main() {
        return new Promise((resolve, reject) => {
            Array.from(this._styleSheets)
                .map(url => path.resolve(this.basePath, url))
                .forEach(cssFile => this.cssFiles.add(cssFile));

            resolve(Array.from(this.cssFiles));
        });
    }

    get html() {
        const html = this._buffer.contents ?
            this._buffer.contents.toString()
            :
            this._buffer.toString();

        return html;
    }

    get _styleSheets() {
        const styleSheets = new Set();

        let addStyleSheetUrl,
            href;

        XRegExp.forEach(this.html, this.regex.styleSheet, match => {
            addStyleSheetUrl = this.includeAll ? true : !XRegExp.exec(match.styleSheet, this.regex.ignoreElement);

            if (addStyleSheetUrl) {
                href = XRegExp.exec(match.styleSheet, this.regex.href)

                if (href) 
                    styleSheets.add(href.url);
            }
        });

        return styleSheets;
    }
}

module.exports = uiData => new CssFiles(uiData).main();