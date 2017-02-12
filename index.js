'use strict';

class Vamtiger {
    constructor(configuration) {
        this._configuration = configuration ? configuration : {};
    }

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
}

module.exports = Vamtiger;