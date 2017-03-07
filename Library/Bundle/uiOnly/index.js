'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class UiOnly {
    constructor(uiHtmlSourcePath) {
        this.uiHtmlSourcePath = uiHtmlSourcePath;
        this.uiHtmlBundlePath = this.getBundlePath(this.uiHtmlSourcePath);
        this._uiCssSourceFiles = null
        this._uiCssFiles = null;
    }

    _handleError(error) {
        throw error;
    }

    get main() {
        const main = this.tasks
            .then(() => null)
            .catch(this._handleError);

        return main;
    }

    get _uiHtmlBundlePath() {
        const uiHtmlBundlePath = XRegExp.replace(this.uiHtmlSourcePath, 'Source', 'Bundle');

        return uiHtmlBundlePath;
    }

    getBundlePath(sourcePath) {
        const bundlePath = XRegExp.replace(sourcePath, 'Source', 'Bundle');

        return bundlePath;
    }

    get tasks() {
        const tasks = Promise.all([
            this._copyUiHtml,
            this._bundleUiCss
        ]);

        return tasks;
    }

    get _copyUiHtml() {
        const file = {
                source: this.uiHtmlSourcePath,
                destination: this.uiHtmlBundlePath
            },
            copyUiHtml = vamtiger.copy.file(file);

        return copyUiHtml;
    }

    get _bundleUiCss() {
        return new Promise(async (resolve, reject) => {
            const uiHtml = await vamtiger.get.fileData(this.uiHtmlSourcePath, true)
                .catch(reject);

            let bundleUiCss;

            this.uiCssSourceFiles = await vamtiger.get.cssFiles({
                filePath: uiHtml.filePath, 
                buffer: uiHtml.fileData, 
                includeAll: true
            }).catch(reject);

            bundleUiCss = Promise.all(this.uiCssFiles.map(uiCssFile => vamtiger.bundle.cssFile(uiCssFile)))
                .then(resolve)
                .catch(reject);

            return bundleUiCss;
        });
    }

    set uiCssSourceFiles(uiCssSourceFiles) {
        const uiCssFiles = [];

        this._uiCssSourceFiles = uiCssSourceFiles;

        this._uiCssSourceFiles.forEach(uiCssSourceFile => uiCssFiles.push({
            source: uiCssSourceFile,
            destination: this.getBundlePath(uiCssSourceFile)
        }));

        this._uiCssFiles = uiCssFiles;
    }

    get uiCssSourceFiles() {
        return this._uiCssSourceFiles;
    }

    get uiCssFiles() {
        return this._uiCssFiles;
    }
}

exports.main = uiHtmlSourcePath => new UiOnly(uiHtmlSourcePath).main;