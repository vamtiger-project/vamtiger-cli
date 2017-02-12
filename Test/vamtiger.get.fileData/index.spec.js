'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    filePath = path.resolve(__dirname, 'MockData/index.txt');

describe(`vamtiger.get.fileData should`, function () {
    it('return a promise', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /^promise$/i;

        expect(vamtiger.get.fileData(filePath).constructor.name)
            .to.match(expected);

        done();
    });

    it('return the text a file', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /^The text in a file$/i;

        vamtiger.get.fileData(filePath)
            .then(fileData => expect(fileData.fileText).to.match(expected))
            .then(() => done())
            .catch(done);
    });

    it('throw an error when the path does not exist', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /error/i;
            
        vamtiger.get.fileData('some invalid path')
            .catch(error => expect(error).to.be.an('error'))
            .then(() => done());
    });
});