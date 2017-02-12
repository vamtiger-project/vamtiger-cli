'use strict';

const XRegExp = require('xregexp'),

    formatJs = require('js-beautify').js_beautify,
    
    UiCss = require('../Ui').class;

class BundlePrefixedUiCss extends UiCss {
    constructor(filePath) {
        super(filePath);
    }

    get prefix() {
        const match = XRegExp.exec(this.bodyInnerHtml, this.regex.elementId);

        let prefix;

        if (match)
            prefix = match.elementId;

        return prefix;
    }

    get css() {
        const prefixedSelectorCss = this.get.prefixedSelectorCss(this),
            css = `
                <style>
                    ${prefixedSelectorCss}
                </style>
            `;

        return css;
    }

    get _ui() {
        const ui = `
            'use strict';

            const css = \`${this.css}\`;

            export default css;
        `;

        return formatJs(ui);
    }
}

exports.main = filePath => new BundlePrefixedUiCss(filePath).main();