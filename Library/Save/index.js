'use strict';

class Save {
    static get cssBundle() {
        const cssBundle = require('./CssBundle');

        return cssBundle;
    }

    static get htmlPage() {
        const htmlPage = require('./HtmlPage');

        return htmlPage;
    }
}

module.exports = Save;