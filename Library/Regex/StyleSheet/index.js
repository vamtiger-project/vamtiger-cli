'use strict';

const XRegExp = require('xregexp');

class StyleSheet {
    static get regex() {
        const regex = XRegExp(
            StyleSheet.pattern,
            StyleSheet.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            (?<styleSheet>
                <link.*?rel="stylesheet".*?>
            )
        `;

        return pattern;
    }

    static get flags() {
        const flags = 'xmsni';

        return flags;
    }
}

module.exports = StyleSheet;