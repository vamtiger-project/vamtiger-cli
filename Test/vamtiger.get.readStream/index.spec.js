'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    htmlPath = path.resolve(__dirname, 'MockData/index.html');

describe(`vamtiger.get.readStream should`, function () {
    it('return a readable stream', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /^readstream$/i;
            
        expect(vamtiger.get.readStream(htmlPath).constructor.name).to.match(expected);

        done();
    });

    it('throw an error when the path does not exist', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /error/i;
            
        vamtiger.get.readStream('some invalid path')
            .on('error', error => {
                expect(error).to.be.an('error');
                done();
            });
    });
});