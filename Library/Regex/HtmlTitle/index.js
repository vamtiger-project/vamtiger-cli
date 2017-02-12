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
            (?<htmlTitle>
                <title.*>
                    \\s*
                    (?<titleText>
                        .*
                        \\S
                    )
                    \\s*
                <\/title>
            )
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = HtmlTitle;