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
                    // fs.readdir returns relative paths.
                    // Recursively reading subfolders would require absolute paths
                    folderContent = folderContent.map(folder => path.resolve(absolutePath, folder));

                    done = () => resolve(folderContent);
                } else
                    done = () => resolve(folderContent);

                done();
            });
        });
    }

    _recursivelyGetFolderContent(absolutePath, mainResolve, mainReject) {
        return new Promise((resolve, reject) => {
            if (!mainResolve) {
                mainResolve = resolve;
                mainReject = reject;

                resolve.mainResolve = true;
                reject.mainReject = true;
            }

            this._getFolderContent(absolutePath)
                .then(folderContent => this._getFolderContentInfo(folderContent))
                .then(folderContentInfo => this.getClassifiedFolderContent(folderContentInfo, absolutePath))
                .then(classifiedFolderContent => this._referenceFolderFiles(classifiedFolderContent))
                .then(classifiedFolderContent => this._getSubfolderContent(classifiedFolderContent, mainResolve, mainReject))
                .then(() => resolve.mainResolve ? mainResolve() : resolve())
                .catch(reject);
        });
    }

    _getSubfolderContent(classifiedFolderContent, mainResolve, mainReject) {
        const recursivelyGetFolderContent = classifiedFolderContent.folders
                .map(folder => this._recursivelyGetFolderContent(folder, mainResolve, mainReject)),
            getSubfolderContent = Promise
                .all(recursivelyGetFolderContent);

        return getSubfolderContent;
    }

    _getFolderContentInfo(folderContent) {
        const getPathInfo = folderContent
                .map(folderContentPath => this.get.pathInfo(folderContentPath)),
            getFolderContentInfo = Promise
                .all(getPathInfo);

        return getFolderContentInfo;
    }

    getClassifiedFolderContent(folderContentInfo, folderPath) {
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