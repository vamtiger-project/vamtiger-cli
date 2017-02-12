'use strict';

const XRegExp = require('xregexp');

class BodyInnerHtml {
    static get regex() {
        const regex = XRegExp(
            BodyInnerHtml.pattern,
            BodyInnerHtml.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            ^(?<before>
                .*?
            )
            (?<classDeclaration>
                class .*?
            )
            (?<after>
                {.*
            )
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = BodyInnerHtml;