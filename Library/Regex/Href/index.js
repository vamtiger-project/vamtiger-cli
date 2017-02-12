'use strict';

const XRegExp = require('xregexp');

class Href {
    static get regex() {
        const regex = XRegExp(
            Href.pattern,
            Href.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            href="
                (?<url>
                    .*
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

module.exports = Href;