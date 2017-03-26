'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class LowercaseDashed {
    constructor(words) {
        this.words = words;
    }

    get main() {
        return this.lowercaseDashed;
    }

    get lowercaseDashed() {
        const lowercaseDashed = XRegExp
            .split(this.words, vamtiger.regex.nonWords)
            .map(word => word.toLowerCase())
            .join('-');

        return lowercaseDashed;
    }
}

module.exports = words => new LowercaseDashed(words).main;