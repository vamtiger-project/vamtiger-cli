'use strict';

class Create {
    static get customElement() {
        const customElement = require('./CustomElement');

        return customElement;
    }

    static get folder() {
        const folder = require('./Folder');

        return folder;
    }

    static get pathFolders() {
        const pathFolders = require('./PathFolders');

        return pathFolders;
    }
}

module.exports = Create;