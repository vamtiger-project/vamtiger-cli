'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class PrefixedSelectorCss extends Vamtiger {
    constructor({prefix, cssBundle}) {
        super();
        
        this.prefix = prefix;
        this.prefixRegex = XRegExp(`^#${this.prefix}$`);
        this.cssBundle = cssBundle;
        this.prefixedCss = ''
    }

    main() {
        const cssMatch = XRegExp.exec(this.cssBundle, this.regex.css);

        if (cssMatch) {
            XRegExp.forEach(cssMatch.css, this.regex.cssBlock, cssBlock => this._updatePrefixedCss(cssBlock));

            this.prefixedCss += cssMatch.sourcemap;
        }

        return this.prefixedCss;
    }

    _updatePrefixedCss(cssBlock) {
        const prefixedSelectors = cssBlock.selectors
            .split(this.regex.commas)
            .map(selector => XRegExp.match(selector, this.prefixRegex) ? this.prefix : `${this.prefix} ${selector}`)
            .join(',')

        this.prefixedCss += `${prefixedSelectors}${cssBlock.attributes}`;
    }
}

module.exports = cssData => new PrefixedSelectorCss(cssData).main();