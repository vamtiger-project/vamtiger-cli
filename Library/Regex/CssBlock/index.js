'use strict';

const XRegExp = require('xregexp');

class CssBlock {
    static get regex() {
        const regex = XRegExp(
            CssBlock.pattern,
            CssBlock.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            (?<selectors>
                .*?
            )
            (?<attributes>
                {.*?}
            )
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = CssBlock;