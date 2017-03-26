'use strict';

const path = require('path'),
    fs = require('fs'),

    XRegExp = require('xregexp'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class FolderContent extends Vamtiger {
    constructor({absolutePath, recursive, grouped}) {
        super();
        
        this.absolutePath = absolutePath;
        this.recursive = recursive;
        this.grouped = grouped;
        
        this.folderContent = [];
    }
    
    main() {
        let main = this.recursive ? this._recursivelyGetFolderContent(this.absolutePath) : this._getFolderContent(this.absolutePath);

        main = main
            .then(() => this.grouped ? this.groupedFolderContent : this.folderContent)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    _getFolderContent(absolutePath) {
        return new Promise((resolve, reject) => {
            fs.readdir(absolutePath, (error, folderContent) => {
                let done;
                
                if (error)
                    done = () => reject(error);
                else if (this.recursive) {
                    folderContent = folderContent.map(folder => path.resolve(absolutePath, folder));

                    done = () => resolve(folderContent);
                } else {
                    this.folderContent = folderContent;
                    
                    done = () => resolve(folderContent);
                }

                done();
            });
        });
    }

    _recursivelyGetFolderContent(absolutePath) {
        const recursivelyGetFolderContent = this._getFolderContent(absolutePath)
            .then(folderContent => this._getFolderContentInfo(folderContent))
            .then(folderContentInfo => this._getClassifiedFolderContent(folderContentInfo, absolutePath))
            .then(classifiedFolderContent => this._referenceFolderFiles(classifiedFolderContent))
            .then(classifiedFolderContent => this._getSubfolderContent(classifiedFolderContent))
            .catch(this._handleError);

        return recursivelyGetFolderContent;
    }

    _getSubfolderContent(classifiedFolderContent) {
        const getSubfolderContent = Promise.all(
                classifiedFolderContent.folders.map(folder => this._recursivelyGetFolderContent(folder))
            );

        return getSubfolderContent;
    }

    _getFolderContentInfo(folderContent) {
        const getPathInfo = folderContent
                .map(folderContentPath => this.get.pathInfo(folderContentPath)),
            getFolderContentInfo = Promise
                .all(getPathInfo);

        return getFolderContentInfo;
    }

    _getClassifiedFolderContent(folderContentInfo, folderPath) {
        const classifiedFolderContent = {
                path: null,
                files: null,
                folders: null
            },
            files = new Set(),
            folders = new Set();

        if (!folderContentInfo.length)
            classifiedFolderContent.path = folderPath;

        folderContentInfo.forEach((folderContentInfo, index) => {
            if (!index)
                classifiedFolderContent.path = folderContentInfo.parent;
            
            if (folderContentInfo.stats.isFile())
                files.add(folderContentInfo.path);
            else if (folderContentInfo.stats.isDirectory())
                folders.add(folderContentInfo.path);
        });

        classifiedFolderContent.files = Array.from(files);
        classifiedFolderContent.folders = Array.from(folders);

        return classifiedFolderContent
    }

    _referenceFolderFiles(classifiedFolderContent) {
        const folderContent = {
            folder: classifiedFolderContent.path,
            files: classifiedFolderContent.files
        };

        this.folderContent.push(folderContent);

        return classifiedFolderContent;
    }

    get groupedFolderContent() {
        const groupedFolderContent = [];

        this.folderContent.some((currentFolderContent, index) => this.groupFolderContent({index, groupedFolderContent}));

        return groupedFolderContent;
    }

    groupFolderContent({index, groupedFolderContent}) {
        const folderGroupRegexPattern = path.resolve(this.absolutePath, '\\w+/'.repeat(index)),
            folderGroupRegex = XRegExp(`^${folderGroupRegexPattern}$`),
            folderGroup = this.folderContent.filter(currentFolderContent => XRegExp.match(currentFolderContent.folder, folderGroupRegex));

        let done;

        if (folderGroup.length)
            groupedFolderContent.push(folderGroup);
        else
            done = true;

        return done;
    }
}

module.exports = parameters => new FolderContent(parameters).main();