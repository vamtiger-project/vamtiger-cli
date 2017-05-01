'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    filePath = path.resolve(__dirname, 'MockData/index.css');

describe(`vamtiger.bundle.css should`, function () {
    it('bundle all css for a defined input path', function (done) {
        const vamtiger = new Vamtiger(),
            bundledCssPath = path.resolve(
                path.dirname(filePath),
                'Bundled',
                'index.css'
            );
        
        vamtiger.get.readStream(filePath)
            .pipe(vamtiger.bundle.css({filePath}))
            .pipe(vamtiger.get.writeStream(bundledCssPath))
            .on('error', done)
            .on('finish', done);
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            bundledCssPath = path.resolve(
                path.dirname(filePath),
                'Bundled'
            ),
            bundledCssFileName = 'index-gulp.css';
        
        gulp.src(filePath)
            .pipe(vamtiger.bundle.css({filePath}))
            .pipe(rename(bundledCssFileName))
            .pipe(gulp.dest(bundledCssPath))
            .on('finish', done)
            .on('error', done);
    });
});