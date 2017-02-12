'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    htmlPath = path.resolve(__dirname, 'MockData/WebAppSource/index.html');

describe(`vamtiger.get.customElement should`, function () {
    it('return a string', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /^string$/i,
            fileData = {
                html: '<some-html></some-html>',
                css: '/** some css **/',
                js: '// some js',
                basePath: path.dirname(htmlPath)
            };
            
        expect(vamtiger.get.customElement(fileData).constructor.name).to.match(expected);

        done();
    });

    it.skip('return a custom element', function (done) {
        const vamtiger = new Vamtiger(),
            expected = require('./MockData/Expected').expected,
            fileData = {
                html: '<some-html></some-html>',
                css: '/** some css **/',
                js: '// some js',
                basePath: path.dirname(htmlPath)
            };
            
        expect(vamtiger.get.customElement(fileData)).to.equal(expected);

        done();
    });

    it('throw an error when no file data is defined', function (done) {
        const vamtiger = new Vamtiger(),
            runTest = () => new Promise((resolve, reject) => vamtiger.get.customElement());

        runTest()
            .catch(error => expect(error).to.be.an('error'))
            .then(() => done)
            .catch(done);

        done();
    });
});