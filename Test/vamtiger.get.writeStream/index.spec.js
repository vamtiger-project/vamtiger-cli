'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    htmlPath = path.resolve(__dirname, 'MockData/index.html');

describe(`vamtiger.get.writeStream should`, function () {
    it('return a writable stream', function (done) {
        const vamtiger = new Vamtiger(),
            expected = /^writestream$/i;
            
        expect(vamtiger.get.writeStream(htmlPath).constructor.name).to.match(expected);

        done();
    });
});