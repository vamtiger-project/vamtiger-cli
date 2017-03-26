'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    htmlSourceFile = path.resolve(__dirname, 'ui-project/Source/Ui/index.html');

describe(`vamtiger.build.component should`, function () {
    it('build the ui component only for a defined input path', function (done) {
        const vamtiger = new Vamtiger();
        
        vamtiger.build.component({htmlSourceFile})
            .then(evaluateResult)
            .then(done)
            .catch(done);
    });
});

function evaluateResult(result) {
    expect(result).to.not.be.an('error');
}