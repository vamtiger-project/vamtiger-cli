'use strict';

const path = require('path'),
    fs = require('fs'),

    expect = require('chai').expect,
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    gUtil = require('gulp-util'),
    
    Vamtiger = require('../../'),

    filePath = path.resolve(__dirname, 'MockData/index.js');

describe(`vamtiger.bundle.js should`, function () {
    it('bundle all javascript for a defined input path', function (done) {
        const vamtiger = new Vamtiger(),
            transpiledJsPath = path.resolve(
                path.dirname(filePath),
                'Bundled',
                'index.js'
            ),
            expected = /^async function works$/;
        
        vamtiger.get.readStream(filePath)
            .pipe(vamtiger.bundle.js({filePath}))
            .pipe(vamtiger.get.writeStream(transpiledJsPath))
            .on('error', done)
            .on('finish', testResult);

        function testResult() {
            vamtiger.get.readStream(transpiledJsPath)
                .on('data', buffer => {
                    const transpiledJs = buffer.toString();

                    let testInstance;

                    eval(transpiledJs);

                    testInstance.main()
                        .then(result => expect(result).to.match(expected))
                        .then(() => done())
                        .catch(done);
                })
                .on('error', done);
        }
    });

    it('be compatible with gulp', function (done) {
        const vamtiger = new Vamtiger(),
            transpiledJsFileName = 'index-gulp.js',
            transpiledJsPath = path.resolve(
                path.dirname(filePath),
                'Bundled'
            ),
            expected = /^async function works$/;
        
        gulp.src(filePath)
            .pipe(vamtiger.bundle.js({filePath}))
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

                    testInstance.main()
                        .then(result => expect(result).to.match(expected))
                        .then(() => done())
                        .catch(done);
                })
                .on('error', done);
        }
    });
});