'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger(),

    pattern = `
        (?<parentPath>
            .*?
        )
        (?<jsFolder>
            Source/
        )
        (?<indexFile>
            index.js
        )
    `,
    flags = 'xmns',
    regex = vamtiger.get.regex({
        pattern,
        flags
    });

module.exports = regex;