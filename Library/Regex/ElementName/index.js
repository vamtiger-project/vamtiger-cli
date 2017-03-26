'use strict';

const XRegExp = require('xregexp');

class ElementName {
    static get regex() {
        const regex = XRegExp(
            ElementName.pattern,
            ElementName.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            name="
                (?<elementName>
                    [\\w-]+\\w+
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

module.exports = ElementName;