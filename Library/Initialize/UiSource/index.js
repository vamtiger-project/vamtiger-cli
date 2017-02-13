'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),

    config = require('./Config'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class UiSource extends Vamtiger {
    constructor(sourcePath) {
        super();
        
        this.sourcePath = sourcePath;

        this.boilerplatePath = null;
        this.rootFolder = null;
        this.sourceFolders = null;
        this.sourceFolderGroups = null;
    }

    main() {
        const main = new Promise((resolve, reject) => this._main(resolve, reject));
        
        return main;
    }

    _main(resolve, reject) {
        this.boilerplatePath = config.boilerplatePath;
        
        this.sourceFolders = this._sourceFolders;

        this.rootFolder = this._rootFolder;

        this.sourceFolderGroups = this._sourceFolderGroups;

        this._initializeSource
            .then(resolve)
            .catch(reject);
    }

    _handleError(error) {
        throw error;
    }

    get _sourceFolders() {
        const relativeSourceFolders = config.sourceFolders,
            sourceFolders = new Set();

        relativeSourceFolders
            .map(relativePath => path.resolve(this.sourcePath, relativePath))
            .forEach(absolutePath => sourceFolders.add(absolutePath));

        return Array.from(sourceFolders);
    }

    get _rootFolder() {
        const folderData = {
            root: null,
            frequency: 0
        };

        let rootFolderIsUnresolved = false,
            errorEncountered;

        this.sourceFolders.reduce((folderData, sourceFolder) => this._frequency(folderData, sourceFolder), folderData);

        rootFolderIsUnresolved = !(folderData.frequency === this.sourceFolders.length);

        if (rootFolderIsUnresolved) {
            errorEncountered = new Error('The root folder could not be resolved');
            errorEncountered.name = 'Unresolved Root Folder';
            errorEncountered.data = folderData;

            throw errorEncountered;
        }

        return folderData.root;
    }

    _frequency(folderData, folder) {
        const folderRegex = XRegExp(folder);

        let folderFrequency = 0,
            folderShouldBeReferenced = false;

        this.sourceFolders.forEach(sourceFolder => XRegExp.match(sourceFolder, folderRegex) ? folderFrequency++ : folderFrequency);

        folderShouldBeReferenced = folderFrequency > folderData.frequency;

        if (folderShouldBeReferenced) {
            folderData.root = folder;
            folderData.frequency = folderFrequency;
        }

        return folderData
    }

    get _sourceFolderGroups() {
        const sourceFolderGroups = [];

        let folderGroupRegexPattern = this.rootFolder,
            folderGroupRegex,
            sourceFolderGroup,
            addToSourceFolderGroup,
            doneGroupingSourceFolders = false;
        
        this.sourceFolders.some((sourceFolder, index) => {
            if (index)
                folderGroupRegexPattern = path.resolve(folderGroupRegexPattern, '\\w+');

            folderGroupRegex = XRegExp(`^${folderGroupRegexPattern}$`);

            sourceFolderGroup = this.sourceFolders.filter(sourceFolder => XRegExp.match(sourceFolder, folderGroupRegex));

            if (sourceFolderGroup.length)
                sourceFolderGroups.push(sourceFolderGroup);
            else
                doneGroupingSourceFolders = true;

            return doneGroupingSourceFolders;
        });

        return sourceFolderGroups
    }

    get _initializeSource() {
        let initializeSource = Promise.resolve();
        
        this.sourceFolderGroups.forEach(folders => {
            initializeSource = initializeSource
                .then(() => this.create.folders(folders))
                .then(() => folders.map(folder => this._sourceFolderFile(folder)))
                .then(files => this.copy.files(files));
        });

        initializeSource = initializeSource
            .catch(this._handleError);

        return initializeSource;
    }

    _sourceFolderFile(folder) {
        const sourceFolderFile = {
            location: null,
            destination: null
        };

        sourceFolderFile.location;
    }
}

module.exports = sourcePath => new UiSource(sourcePath).main();