'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger(),

    pattern = `
        (?<word>
            \\w+
        )
    `,
    flags = 'xmn',
    regex = vamtiger.get.regex({
        pattern,
        flags
    });

module.exports = regex;