'use strict';

const path = require('path'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    htmlPath = path.resolve(__dirname, 'MockData/index.html');

describe(`vamtiger.create.customElement should`, function () {
    it(`create a custom element from html`, function (done) {
        const configuration = {
                source: htmlPath
            },
            vamtiger = new Vamtiger(configuration),
            customElementPath = path.resolve(
                path.dirname(htmlPath),
                `custom-element.js`
            );
        
        vamtiger.get.readStream(vamtiger.source)
            .pipe(vamtiger.create.customElement(htmlPath))
            .pipe(vamtiger.get.writeStream(customElementPath))
            .on('finish', done)
            .on('error', done);
    });

    it(`work without the contructor configuration`, function (done) {
        const vamtiger = new Vamtiger(),
            customElementPath = path.resolve(
                path.dirname(htmlPath),
                `custom-element.js`
            );
        
        vamtiger.get.readStream(htmlPath)
            .pipe(vamtiger.create.customElement(htmlPath))
            .pipe(vamtiger.get.writeStream(customElementPath))
            .on('finish', done)
            .on('error', done);
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            customElementName = 'custom-element-gulp.js',
            customElementPath = path.dirname(htmlPath);

        gulp.src(htmlPath)
            .pipe(vamtiger.create.customElement(htmlPath))
            .pipe(rename(customElementName))
            .pipe(gulp.dest(customElementPath))
            .on('error', gUtil.log)
            .on('end', done);
    })
});