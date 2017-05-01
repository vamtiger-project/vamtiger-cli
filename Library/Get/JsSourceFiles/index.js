'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class JsSourceFiles {
    constructor({projectPath, referenceFolder}) {
        this.projectPath = projectPath;
        this.referenceFolder = referenceFolder;

        this._polyfillFiles = null;
    }

    get _main() {
        const main = this._setJsSourceFiles
            .catch(this._handleError);

        return main;
    }

    get _setJsSourceFiles() {
        const setPolyfillFiles = vamtiger.get.folderContent({absolutePath: this._polyfillPath})
            .then(JsSourceFiles => JsSourceFiles.map(sourceFile => path.join(this._polyfillPath, sourceFile, 'index.js')))
            .catch(this._handleError);

        return setPolyfillFiles;
    }

    get _polyfillPath() {
        const polyfillPath = path.resolve(
            this.projectPath, 
            'Source',
            this.referenceFolder
        );

        return polyfillPath;
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new JsSourceFiles(parameters)._main;