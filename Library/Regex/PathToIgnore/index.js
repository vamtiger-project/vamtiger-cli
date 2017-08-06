'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger(),

    pattern = `
        \\.DS_Store
    `,
    flags = 'xmnsi',
    regex = vamtiger.get.regex({
        pattern,
        flags
    });

module.exports = regex;