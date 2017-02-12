'use strict';

const XRegExp = require('xregexp');

class IgnoreElement {
    static get regex() {
        const regex = XRegExp(
            IgnoreElement.pattern,
            IgnoreElement.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `data-ignore`;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
};

module.exports = IgnoreElement;