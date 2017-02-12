'use strict';

const XRegExp = require('xregexp');

class ElementId {
    static get regex() {
        const regex = XRegExp(
            ElementId.pattern,
            ElementId.flags
        );

        return regex;
    }

    static get pattern() {
        const pattern = `
            id="
                (?<elementId>
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

module.exports = ElementId;