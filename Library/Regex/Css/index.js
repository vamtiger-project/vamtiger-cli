'use strict';

const XRegExp = require('xregexp');

class Css {
    static get regex() {
        const regex = XRegExp(
            Css.pattern,
            Css.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            (?<css>
                .*}
            )
            (?<sourcemap>
                .*
            )
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = Css;