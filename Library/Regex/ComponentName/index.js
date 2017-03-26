'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger(),
    
    quotes = `"|'`;

module.exports = vamtiger.get.regex({
    pattern: `
        name \\s+ = \\s+ (${quotes})
        (?<componentName>
            .*?
        )
        (${quotes})
    `,
    flags: 'xmns'
});