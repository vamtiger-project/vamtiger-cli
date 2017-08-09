'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class PathFolders {
    constructor({absolutePath}) {
        this.absolutePath = absolutePath;

        this._absolutePathIsFile = null;
        this._foldersToCreate = null;
    }

    get _main() {
        const main = this._setAbsolutePathIsFile
            .then(() => this._setFoldersToCreate)
            .then(() => this._createPathFolders)
            .catch(this._handleError);

        return main;
    }

    get _setAbsolutePathIsFile() {
        const checkIfAbsolutePathIsFile = vamtiger.get.pathInfo(this.absolutePath)
            .then(pathInfo => this._absolutePathIsFile = pathInfo.stats.isFile())
            .catch(() => this._absolutePathIsFile = false);

        return checkIfAbsolutePathIsFile;
    }

    get _setFoldersToCreate() {
        let foldersToCreate;
        
        if (this._absolutePathIsFile)
            this._foldersToCreate = [];
        else
            foldersToCreate = vamtiger.get.pathsWhichDontExist({absolutePath: path.dirname(this.absolutePath)})
                .then(pathsWhichDontExist => this._foldersToCreate = pathsWhichDontExist)
                .catch(error => this._handleError(error));

        return foldersToCreate;
    }
    
    get _createPathFolders() {
        let createPathFolders = Promise.all(
            this._foldersToCreate.map(folder => vamtiger.create.folder(folder))
        );

        createPathFolders = createPathFolders
            .catch(error => this._handleError(error));

        return createPathFolders
    }

    _handleError(error) {
        let throwError = true;
        
        if (error.code)
            throwError = !XRegExp.match(error.code, vamtiger.regex.error.code.EEXIST);
        
        if (throwError)
            this._throwError(error);
    }

    _throwError(error) {
        console.log(error.stack);

        throw error;
    }
}

module.exports = parameters => new PathFolders(parameters)._main;