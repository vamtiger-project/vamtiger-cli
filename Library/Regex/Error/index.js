'use strict';

class ErrorRegex {
    static get code() {
        const regex = require('./ErrorCode');

        return regex;
    }
};

module.exports = ErrorRegex;