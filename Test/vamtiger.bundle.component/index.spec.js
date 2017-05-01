'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    defaultComponentMainFile = path.resolve(__dirname, 'ui-project/Source/Component/Main/Default/index.js');

describe(`vamtiger.bundle.component should`, function () {
    it('build the ui component for a defined input path', function (done) {
        const vamtiger = new Vamtiger();
        
        vamtiger.bundle.component({defaultComponentMainFile})
            .then(evaluateResult)
            .then(done)
            .catch(done);
    });
});

function evaluateResult(result) {
    expect(result).to.not.be.an('error');
}