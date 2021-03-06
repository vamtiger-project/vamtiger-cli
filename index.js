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

    get build() {
        const Build = require('./Library/Build');

        return Build;
    }

    get bundle() {
        const Bundle = require('./Library/Bundle');

        return Bundle;
    }

    get package() {
        const Package = require('./Library/Package');

        return Package;
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

    get update() {
        const Update = require('./Library/Update');

        return Update;
    }

    get handle() {
        const Handle = require('./Library/Handle');

        return Handle;
    }

    get run() {
        const Run = require('./Library/Run');

        return Run;
    }

    get save() {
        const Save = require('./Library/Save');

        return Save;
    }
}

module.exports = Vamtiger;