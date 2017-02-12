'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    cssPath = path.resolve(__dirname, 'MockData/index.css');

describe(`vamtiger.bundle.css should`, function () {
    it('bundle all css for a defined input path', function (done) {
        const vamtiger = new Vamtiger(),
            bundledCssPath = path.resolve(
                path.dirname(cssPath),
                'Bundled',
                'index.css'
            );
        
        vamtiger.get.readStream(cssPath)
            .pipe(vamtiger.bundle.css(cssPath))
            .pipe(vamtiger.get.writeStream(bundledCssPath))
            .on('error', done)
            .on('finish', done);
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            bundledCssPath = path.resolve(
                path.dirname(cssPath),
                'Bundled'
            ),
            bundledCssFileName = 'index-gulp.css';
        
        gulp.src(cssPath)
            .pipe(vamtiger.bundle.css(cssPath))
            .pipe(rename(bundledCssFileName))
            .pipe(gulp.dest(bundledCssPath))
            .on('finish', done)
            .on('error', done);
    });
});