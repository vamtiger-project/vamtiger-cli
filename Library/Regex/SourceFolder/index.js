'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger();

module.exports = vamtiger.get.regex({
    pattern: `
        (?<sourceFolder>
            Source
        )
        (?=\/)
    `,
    flags: 'xms'
});