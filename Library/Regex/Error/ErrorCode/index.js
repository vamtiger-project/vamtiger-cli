'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(4)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class ErrorCode {
    static get ENOENT() {
        const pattern = 'ENOENT',
            flags = 'i',
            explicit = true,
            regex = vamtiger.get.regex({
                pattern,
                flags,
                explicit
            });

        return regex;
    }

    static get EEXIST() {
        const pattern = 'EEXIST',
            flags = 'i',
            explicit = true,
            regex = vamtiger.get.regex({
                pattern,
                flags,
                explicit
            });

        return regex;
    }
};

module.exports = ErrorCode;