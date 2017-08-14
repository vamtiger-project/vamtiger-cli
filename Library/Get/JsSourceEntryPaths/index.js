'use strict';

const path = require('path'),

    Args = require('vamtiger-argv'),
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    args = new Args(),
    vamtiger = new Vamtiger();

class JsSourceEntryPaths {
    constructor({projectPath}) {
        this.projectPath = projectPath;

        this._folderContent = undefined;
    }

    get main() {
        const params = {
                projectPath: this.projectPath
            },
            main = vamtiger.get.jsSouceFolders(params)
                .then(jsSouceFolders => this._getJsSouceFolders({jsSouceFolders}))
                .catch(error => this._handleError(error));

        return main;
    }

    _getJsSouceFolders(params) {
        const jsSouceFolders = params.jsSouceFolders
            .map(folderPath => path.resolve(folderPath, 'index.js'));

        return jsSouceFolders;
    }

    _handleError(error) {
        console.log(error.message);
        console.log(error.stack);

        throw error;
    }
}

module.exports = params => new JsSourceEntryPaths(params).main;