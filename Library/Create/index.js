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
}

module.exports = Create;