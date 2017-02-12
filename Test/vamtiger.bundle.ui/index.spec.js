'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    uiPath = path.resolve(__dirname, 'MockData/index.html');

describe(`vamtiger.bundle.ui should`, function () {
    it('bundle the HTML and CSS for a defined input path', function (done) {
        const vamtiger = new Vamtiger(),
            bundleduiPath = path.resolve(
                path.dirname(uiPath),
                'Bundled',
                'index.js'
            );
        
        vamtiger.get.readStream(uiPath)
            .pipe(vamtiger.bundle.ui(uiPath))
            .pipe(vamtiger.get.writeStream(bundleduiPath))
            .on('error', done)
            .on('finish', done);
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            bundleduiPath = path.resolve(
                path.dirname(uiPath),
                'Bundled'
            ),
            bundledCssFileName = 'index-gulp.js';
        
        gulp.src(uiPath)
            .pipe(vamtiger.bundle.ui(uiPath))
            .pipe(rename(bundledCssFileName))
            .pipe(gulp.dest(bundleduiPath))
            .on('finish', done)
            .on('error', done);
    });
});