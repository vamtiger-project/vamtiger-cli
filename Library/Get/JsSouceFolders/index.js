'use strict';

const path = require('path'),

    Args = require('vamtiger-argv'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    args = new Args(),
    vamtiger = new Vamtiger();

class JsSourceFolders {
    constructor({projectPath}) {
        this.projectPath = projectPath;

        this._folderContent = undefined;
    }

    get main() {
        const main = Promise.resolve()
            .then(() => this._referenceFolderContent)
            .then(() => this._jsSourceFolders)
            .catch(error => this._handleError(error));

        return main;
    }

    get _referenceFolderContent() {
        const souceFolder = this._sourceFolder,
            params = {
                absolutePath: souceFolder,
                depth: 2
            },
            referenceFolderContent = vamtiger.get.folderContent(params)
                .then(folderContent => this._folderContent = folderContent)
                .catch(error => this._handleError(error));

        return referenceFolderContent;
    }

   get _jsSourceFolders() {
        const primarySourceFolders = this._primarySourceFolders,
            getJsSourceFolders = Promise
                .all(primarySourceFolders.map(primarySourceFolder => this._getJsSourceFolders({primarySourceFolder})))
                .then(results => results.reduce((jsSourceFolders, currentJsSourceFolders) => jsSourceFolders.concat(currentJsSourceFolders)))
                .catch(error => handleError(error));

        return getJsSourceFolders;
    }

    _getJsSourceFolders(params) {
        const primarySourceFolder = params.primarySourceFolder,
            regex = XRegExp(primarySourceFolder),
            folderContent = this._folderContent
                .filter(currentPath => currentPath !== primarySourceFolder)
                .filter(currentPath => XRegExp.match(currentPath, regex)),
            getJsSourceFolders = Promise
                .all(folderContent.map(absolutePath => vamtiger.get.pathInfo(absolutePath)))
                .then(results => results.some(pathInfo => pathInfo.stats.isFile()))
                .then(isSourceFolder => isSourceFolder ? [primarySourceFolder] : folderContent)
                .catch(error => handleError(error));

        return getJsSourceFolders
    }

    get _primarySourceFolders() {
        const folderContent = this._folderContent,
            souceFolder = XRegExp(this._sourceFolder),
            primarySourceFolders = new Set();

        let index = 0,
            currentPath,
            currentRelativePath,
            currentPathDepth;

        for (index; index < folderContent.length; index++) {
            currentPath = folderContent[index],
            currentRelativePath = XRegExp.replace(currentPath, souceFolder, '');
            currentPathDepth = XRegExp
                .split(currentRelativePath, vamtiger.regex.forwardSlash)
                .filter(relativePath => relativePath.trim())
                .filter(relativePath => relativePath.length)
                .length;

            if (currentPathDepth === 1)
                primarySourceFolders.add(currentPath);
            else
                break;
        }

        return Array.from(primarySourceFolders)
    }

    get _sourceFolder() {
        const souceFolder = path.resolve(
            this.projectPath,
            'Source'
        );

        return souceFolder;
    }

    _handleError(error) {
        console.log(error.message);
        console.log(error.stack);

        throw error;
    }
}

module.exports = params => new JsSourceFolders(params).main;