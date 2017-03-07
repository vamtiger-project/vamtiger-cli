'use strict';

class Copy {
    static get source() {
        const source = require('./Source');

        return source;
    }

    static get file() {
        const file = require('./File');

        return file;
    }
};

module.exports = Copy;