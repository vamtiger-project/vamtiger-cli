'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class Component {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;
    }
    
    main() {
        const main = this.tasks
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get tasks() {
        const tasks = Promise.all([
            vamtiger.bundle.componentPreviewHtml({
                source: this.source,
                destination: this.destination
            }),
            vamtiger.bundle.componentPreviewCss({
                htmlSource: this.source,
                htmlDestination: this.destination
            }),
            vamtiger.bundle.uiIgnoreCss({
                htmlSource: this.source,
                htmlDestination: this.destination
            })
        ]);

        return tasks
    }
}

module.exports = parameters => new Component(parameters).main();