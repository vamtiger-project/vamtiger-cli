'use strict';

const XRegExp = require('xregexp'),

    formatJs = require('js-beautify').js_beautify,
    
    UiCss = require('../Ui').class;

class BundlePrefixedUiCss extends UiCss {
    constructor(filePath) {
        super(filePath);
    }

    get prefix() {
        const prefix = this.get.customElementName({
            html: this.buffer
        });

        return prefix;
    }

    get css() {
        const prefixedSelectorCss = this.get.prefixedSelectorCss(this),
            css = `
                    ${prefixedSelectorCss}
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