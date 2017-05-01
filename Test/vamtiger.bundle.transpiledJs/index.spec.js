'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    filePath = path.resolve(__dirname, 'MockData/index.js');

describe(`vamtiger.bundle.transpiledJs should`, function () {
    it('bundle and transpile all javascript for a defined input path', function (done) {
        const vamtiger = new Vamtiger(),
            transpiledJsPath = path.resolve(
                path.dirname(filePath),
                'Transpiled',
                'index.js'
            ),
            expected = /^ES2015 Module$/;
        
        vamtiger.get.readStream(filePath)
            .pipe(vamtiger.bundle.transpiledJs({filePath}))
            .pipe(vamtiger.get.writeStream(transpiledJsPath))
            .on('error', done)
            .on('finish', testResult);

        function testResult() {
            vamtiger.get.readStream(transpiledJsPath)
                .on('data', buffer => {
                    const transpiledJs = buffer.toString();

                    let testInstance;

                    eval(transpiledJs);

                    expect(testInstance.name).to.match(expected);
                })
                .on('end', done)
                .on('error', done);
        }
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            transpiledJsFileName = 'index-gulp.js',
            transpiledJsPath = path.resolve(
                path.dirname(filePath),
                'Transpiled'
            ),
            expected = /^ES2015 Module$/;
        
        gulp.src(filePath)
            .pipe(vamtiger.bundle.transpiledJs({filePath}))
            .pipe(rename(transpiledJsFileName))
            .pipe(gulp.dest(transpiledJsPath))
            .on('finish', testResult)
            .on('error', done);

        function testResult() {
            const transpiledGulpJsPath = path.resolve(
                transpiledJsPath,
                transpiledJsFileName
            );
            
            vamtiger.get.readStream(transpiledGulpJsPath)
                .on('data', buffer => {
                    const transpiledJs = buffer.toString();

                    let testInstance;

                    eval(transpiledJs);

                    expect(testInstance.name).to.match(expected);
                })
                .on('end', done)
                .on('error', done);
        }
    });
});