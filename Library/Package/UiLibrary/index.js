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
    }

    get main() {
        const packageParams = {
                projectPath: this.projectPath
            },
            main = Promise.resolve()
                .then(() => vamtiger.bundle.uiLibrary(packageParams))
                .then(() => this._package)
                .catch(this._handleError);
        
        return main;
    }

    get _package() {
        console.log('package')
    }

    _handleError(error) {
        console.error(error);
        throw error;
    }
}

module.exports = parameters => new UiLibrary(parameters).main;