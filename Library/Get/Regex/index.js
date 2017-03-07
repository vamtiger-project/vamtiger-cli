'use strict';

const XRegExp = require('xregexp');

class Regex {
    constructor({pattern, flags, explicit}) {
        this._pattern = pattern;
        this._flags = flags;
        this._explicit = explicit;
    }
    
    main() {
        const regex = XRegExp(this.pattern, this.flags);

        return regex;
    }

    get pattern() {
        let pattern = this._pattern;

        if (this._explicit)
            pattern = `^${pattern}$`;

        return pattern;
    }

    get flags() {
        const flags = this._flags;
        
        return flags;
    }
}

module.exports = configuration => new Regex(configuration).main();