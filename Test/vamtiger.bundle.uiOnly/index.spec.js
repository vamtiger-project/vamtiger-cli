'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    uiPath = path.resolve(__dirname, 'ui-project/Source/Ui/index.html');

describe(`vamtiger.bundle.uiOnly should`, function () {
    it('bundle the ui only for a defined input path', function (done) {
        const vamtiger = new Vamtiger();
        
        vamtiger.bundle.uiOnly(uiPath)
            .then(done)
            .catch(done);
    });
});