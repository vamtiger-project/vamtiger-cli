'use strict';

const XRegExp = require('xregexp');

class NonWords {
    static get regex() {
        const regex = XRegExp(
            NonWords.pattern,
            NonWords.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `\\W+`;

        return pattern;
    }

    static get flags() {
        const flags = 'g';

        return flags;
    }
};

module.exports = NonWords;