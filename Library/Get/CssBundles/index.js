'use strict';

const path = require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class CssBundles extends Vamtiger {
    constructor(cssFiles) {
        super();
        
        this.cssFiles = cssFiles;
        this.fileData = null;
        this.cssBundles = null;
    }

    main() {
        return new Promise((resolve, reject) => {
            this._fileData
                .then(fileData => this.fileData = fileData)
                .then(() => this._cssBundles)
                .then(cssBundles => this.cssBundles = cssBundles)
                .then(() => resolve(this.cssBundles))
                .catch(this._handleError);
        });
    }

    get _fileData() {
        const getFileData = Promise.all(
            this.cssFiles.map(cssFile => this._getFileData(cssFile))
        );

        return getFileData;
    }

    get _cssBundles() {
        const getCssBundles = Promise.all(
            this.fileData.map(fileData => this.get.cssBundle(fileData))
        );

        return getCssBundles;
    }

    _handleError(error) {
        throw error;
    }

    _getFileData(cssPath) {
        return new Promise((resolve, reject) => {
            const fileData = {
                filePath: cssPath,
                buffer: null
            };
            
            this.get.readStream(cssPath)
                .on('data', buffer => fileData.buffer = buffer)
                .on('end', () => resolve(fileData))
                .on('error', reject);
        });
    }
}

module.exports = cssFiles => new CssBundles(cssFiles).main();