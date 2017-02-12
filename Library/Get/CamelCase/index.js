'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class CamelCase extends Vamtiger {
    constructor(words, ignoreFirstWord) {
        super();
        
        this.ignoreFirstWord = ignoreFirstWord;
        this.words = words;
    }
    
    main() {
        const camelCase = XRegExp
            .split(this.words, this.regex.nonWords)
            .map((word, index) => this._camelCaseWord(word, index))
            .join("");

        return camelCase;
    }

    _camelCaseWord(word, index) {
        let makeWordCamelCase = index || (!index && !this.ignoreFirstWord),
            calCaseWord;


        if (makeWordCamelCase)
            calCaseWord = word[0].toUpperCase() + word.substring(1).toLowerCase();
        else
            calCaseWord = word.toLowerCase();

        return calCaseWord;
    }
}

module.exports = (words, ignoreFirstWord) => new CamelCase(words, ignoreFirstWord).main();