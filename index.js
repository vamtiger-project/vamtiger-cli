'use strict';

class Vamtiger {
    constructor(configuration) {
        this._configuration = configuration ? configuration : {};
    }

    get ignore() {}

    get get() {
        const Get = require('./Library/Get');

        return Get;
    }

    get create() {
        const Create = require('./Library/Create');

        return Create
    }

    get bundle() {
        const Bundle = require('./Library/Bundle');

        return Bundle;
    }

    get source() {
        const source = this._configuration.source;

        return source;
    }

    get regex() {
        const Regex = require('./Library/Regex');

        return Regex;
    }

    get initialize() {
        const Initialize = require('./Library/Initialize');

        return Initialize;
    }

    get copy() {
        const Copy = require('./Library/Copy');

        return Copy;
    }
    
    get question() {
        const Question = require('./Library/Question');

        return Question;
    }
}

module.exports = Vamtiger;