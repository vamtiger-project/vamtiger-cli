'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),

    bundleJs = require('./Js'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger(),
    boilerplatePath = path.resolve(__dirname, './Boilerplate');;

class UiLibrary {
    constructor({projectPath}) {
        this.projectPath = projectPath;
        this.cssPath = this._cssPath;
        this.bundleJs = bundleJs;

        this._polyfillSourceFiles = null;
    }

    get main() {
        const main = this._setPolyfillSourceFiles
            .then(() => this._bundleUiLibrary)
            .catch(this._handleError);
        
        return main;
    }

    get _setPolyfillSourceFiles() {
        const setPolyfillSourceFiles = vamtiger.get.polyfillSourceFiles({projectPath: this.projectPath})
            .then(polyfillSourceFiles => this._polyfillSourceFiles = polyfillSourceFiles)
            .catch(this._handleError);

        return setPolyfillSourceFiles;
    }

    get _bundleUiLibrary() {
        let tasks = Promise.all([
            this.bundleJs(this._jsParams),
            this.bundleJs(this._testParams),
            this.bundleJs(this._jsLibraryParams),
            this._bundlePolyfills,
            vamtiger.save.cssBundle(this._cssParams),
            vamtiger.save.htmlPage(this._htmlParams)
        ]);

        tasks = tasks.catch(this._handleError);

        return tasks;
    }

    get _jsParams() {
        const params = {
            source: this._jsPath
        };

        return params;
    }

    get _testParams() {
        const params = {
            source: this._testPath
        };

        return params;
    }

    get _jsLibraryParams() {
        const params = {
            source: this._jsLibraryPath,
            destination: path.resolve(
                this.projectPath,
                'Bundle/Js/Library/index.js'
            ),
            codeOnly: true
        };

        return params;
    }

    _polyfillParams(source) {
        const params = {
                source,
                destination: XRegExp.replace(source, vamtiger.regex.sourceFolder, 'Bundle/Js'),
                codeOnly: true
            };

        return params;
    }

    get _cssParams() {
        const params = {
            source: this._cssPath,
            destination: path.resolve(
                this.projectPath,
                'Bundle/Css/index.css'
            ) 
        };

        return params;
    }

    get _htmlParams() {
        const params = {
            source: path.resolve(
                boilerplatePath,
                'index.html'
            ),
            destination: path.resolve(
                this.projectPath,
                'Bundle/index.html'
            ) 
        };

        return params;
    }

    get _jsPath() {
        const jsPath = path.join(
            this.projectPath,
            'Source/index.js'
        );

        return jsPath;
    }

    get _testPath() {
        const testPath = path.join(
            this.projectPath,
            'Source/Test/index.js'
        );

        return testPath;
    }

    get _jsLibraryPath() {
        const jsLibraryPath = path.resolve(
            boilerplatePath,
            'Library/index.js'
        );

        return jsLibraryPath;
    }

    get _cssPath() {
        const cssPath = path.resolve(
            boilerplatePath,
            'Css/index.css'
        );

        return cssPath;
    }

    get _bundlePolyfills() {
        const polyfillParams = this._polyfillSourceFiles
            .map(this._polyfillParams);
            
        let bundlePolyfills = Promise.all(
                polyfillParams.map(this.bundleJs)
            );

        bundlePolyfills = bundlePolyfills
            .catch(this._handleError);

        return bundlePolyfills;
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new UiLibrary(parameters).main;