'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),

    boilerplatePath = path.resolve(__dirname, 'Boilerplate'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class UiSource extends Vamtiger {
    constructor(initializationPath) {
        super();
        
        this.initializationPath = initializationPath;
        this.sourceFolderRegex = XRegExp(boilerplatePath);

        this.sourceContent = [];
        this.copyInfo = {
            folders: [],
            files: []
        };
    }

    main() {
        const main = this.question('Does this path exist?', this.initializationPath)
            .then(answer => answer.no ? this.ignore : this._handleError(new Error(`Already initialized`)))
            .then(() => this._sourceContent)
            .then(sourceContent => this.sourceContent = sourceContent)
            .then(() => this._copyInfo)
            .then(() => this.copy.source(this.copyInfo))
            .catch(this._handleError);
        
        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _sourceContent() {
        return new Promise((resolve, reject) => {
            const parameters = {
                absolutePath: boilerplatePath,
                recursive: true,
                grouped: true
            };

            this.get.folderContent(parameters)
                .then(resolve)
                .catch(reject);
        });
    }

    get _copyInfo() {
        this.sourceContent.forEach(sourceContent => this._copyInfo = sourceContent);
    }

    set _copyInfo(sourceContent) {
        const folders = [];

        let file = {
            source: null,
            destination: null
        };

        sourceContent.forEach(source => {
            folders.push(this._getDestinationPath(source.folder));

            source.files.forEach(file => this._copyFileInfo = file);
        });

        this.copyInfo.folders.push(folders);
    }
    
    set _copyFileInfo(sourceFile) {
        let copyFileInfo = {
            source: sourceFile,
            destination: this._getDestinationPath(sourceFile)
        };

        this.copyInfo.files.push(copyFileInfo);
    }

    _getDestinationPath(sourceFolder) {
        const destinationPath = XRegExp.replace(sourceFolder, this.sourceFolderRegex, this.initializationPath);

        return destinationPath;
    }
}

module.exports = initializationPath => new UiSource(initializationPath).main();