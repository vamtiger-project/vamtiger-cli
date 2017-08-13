'use strict';

const path = require('path'),
    fs = require('fs'),

    XRegExp = require('xregexp'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger();

class FolderContent extends Vamtiger {
    constructor({absolutePath, recursive, grouped, depth}) {
        super();
        
        this.absolutePath = absolutePath;
        this.grouped = grouped;
        this.depth = depth;
        this.recursive = this.recursive;
        
        this.folderContent = [];
        this.absolutePathRegex = XRegExp(this.absolutePath);
    }
    
    main() {
        let main;
        
        if (this.recursive)
            main = this._recursivelyGetFolderContent(this.absolutePath);
        else if (this.depth)
            main = this._getFolderContentForDepth(this.absolutePath);
        else
            main = this._getFolderContent(this.absolutePath);

        main = main
            .then(() => this.grouped ? this.groupedFolderContent : this.folderContent)
            .catch(this._handleError);

        return main;
    }

    _getFolderContent(absolutePath) {
        return new Promise((resolve, reject) => {
            fs.readdir(absolutePath, (error, folderContent) => {
                let done;
                
                if (error)
                    done = () => reject(error);
                else if (this.recursive) {
                    folderContent = folderContent
                        .filter(folder => !XRegExp.match(folder, vamtiger.regex.pathToIgnore))
                        .map(folder => path.resolve(absolutePath, folder));

                    done = () => resolve(folderContent);
                } else {
                    this.folderContent = folderContent
                        .filter(folder => !XRegExp.match(folder, vamtiger.regex.pathToIgnore));
                    
                    done = () => resolve(this.folderContent);
                }

                done();
            });
        });
    }

    _getFolderContentForDepth() {
        const folderContent = new Set();

        let absolutePaths = [this.absolutePath],
            currentDepth = 0,
            getFolderContentForDepth = Promise.resolve(),
            currentFolderContents,
            folderContents,
            parentPaths;

        for (currentDepth; currentDepth < this.depth; currentDepth++) {
            getFolderContentForDepth = getFolderContentForDepth
                .then(() => Promise.all(absolutePaths.map(absolutePath => this._getFolderContent(absolutePath))))
                .then(results => currentFolderContents = results)
                .then(() => parentPaths = !folderContent.size ? [this.absolutePath] : Array.from(folderContent).slice(folderContent.size - currentFolderContents.length))
                .then(() => currentFolderContents.map((entries, index) => entries.map(entry => path.join(parentPaths[index], entry))))
                .then(currentFolderContents => currentFolderContents.reduce((entries, currentEntries) => entries.concat(currentEntries)))
                .then(currentFolderContents => folderContents = currentFolderContents)
                .then(() => folderContents.forEach(entry => folderContent.add(entry)))
                .then(() => absolutePaths = folderContents);
        }

        getFolderContentForDepth = getFolderContentForDepth
            .then(() => this.folderContent = Array.from(folderContent));
        
        return getFolderContentForDepth;
    }

    _recursivelyGetFolderContent(absolutePath) {
        let folderContent;
        
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

    _handleError(error) {
        console.trace(error.message);

        throw error;
    }
}

module.exports = parameters => new FolderContent(parameters).main();