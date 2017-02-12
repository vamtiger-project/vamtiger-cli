'use strict';

const path = require('path'),
    gulp = require('gulp'),

    rename = require('gulp-rename'),
    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    uiPath = path.resolve(__dirname, 'MockData/index.html');

describe(`vamtiger.get.customElementBoilerplate should`, function () {
    it('return a custom element boilerplate for the defined path', function (done) {
        const vamtiger = new Vamtiger(),
            bundleduiPath = path.resolve(
                path.dirname(uiPath),
                'Boilerplate',
                'index.js'
            );
            
        vamtiger.get.readStream(uiPath)
            .pipe(vamtiger.get.customElementBoilerplate())
            .pipe(vamtiger.get.writeStream(bundleduiPath))
            .on('error', done)
            .on('finish', done);
    });

    it('should be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            customElementName = 'index-gulp.js',
            bundleduiPath = path.resolve(
                path.dirname(uiPath),
                'Boilerplate'
            );
            
        gulp.src(uiPath)
            .pipe(vamtiger.get.customElementBoilerplate())
            .pipe(rename(customElementName))
            .pipe(gulp.dest(bundleduiPath))
            .on('error', done)
            .on('finish', done)
    });
});