'use strict';

class Bundle {
    static get uiLibrary() {
        const uiLibrary = require('./UiLibrary');

        return uiLibrary;
    }
}

module.exports = Bundle;