'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class PolyfillSourceFiles {
    constructor({projectPath}) {
        this.projectPath = projectPath;

        this._polyfillFiles = null;
    }

    get _main() {
        const main = this._setPolyfillSourceFiles
            .catch(this._handleError);

        return main;
    }

    get _setPolyfillSourceFiles() {
        const setPolyfillFiles = vamtiger.get.folderContent({absolutePath: this._polyfillPath})
            .then(polyfillSourceFiles => polyfillSourceFiles.map(sourceFile => path.join(this._polyfillPath, sourceFile, 'index.js')))
            .catch(this._handleError);

        return setPolyfillFiles;
    }

    get _polyfillPath() {
        const polyfillPath = path.resolve(this.projectPath, 'Source/Polyfill');

        return polyfillPath;
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new PolyfillSourceFiles(parameters)._main;