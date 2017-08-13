'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),
    Args = require('vamtiger-argv'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger(),
    boilerplatePath = path.resolve(__dirname, './Boilerplate'),
    args = new Args();

class UiLibrary {
    constructor({projectPath}) {
        this.projectPath = projectPath;

        this.bundleData = undefined;
        this.out
    }

    get main() {
        const packageParams = {
                projectPath: this.projectPath,
                returnData: true
            },
            main = Promise.resolve()
                .then(() => vamtiger.bundle.uiLibrary(packageParams))
                .then(bundleData => this.bundleData = bundleData)
                .then(() => this._packageUiLibrary)
                .catch(this._handleError);
        
        return main;
    }

    get _packageUiLibrary() {
        const packageUiLibrary = vamtiger.get.jsSouceFolders()
            .then(jsSouceFolders => {
                console
            })
            .catch(error => handleError(error));

        return packageUiLibrary;
    }

    _handleError(error) {
        console.error(error);
        throw error;
    }
}

module.exports = parameters => new UiLibrary(parameters).main;