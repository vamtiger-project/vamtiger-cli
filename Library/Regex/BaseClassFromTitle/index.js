'use strict';

const XRegExp = require('xregexp');

class HtmlTitle {
    static get regex() {
        const regex = XRegExp(
            HtmlTitle.pattern,
            HtmlTitle.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            data-vamtiger-extends="
                (?<baseClass>
                    \\w+
                )
            "
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = HtmlTitle;