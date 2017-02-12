'use strict';

const path = require('path'),
    Mocha = require('mocha'),
    
    config = require('./Config'),

    test = new Mocha(),

    testFiles = config.testFiles,
    testFileName = 'index.spec.js',

    testSuite = testFiles.reduce((absolutePaths, relativePath) => {
        const absolutePath = path.resolve(__dirname, relativePath, testFileName);

        absolutePaths.add(absolutePath);

        return absolutePaths;
    }, new Set());

testSuite.forEach(suit => test.addFile(suit));

test.run((failures) => process.on('exit', () => process.exit(failures)));