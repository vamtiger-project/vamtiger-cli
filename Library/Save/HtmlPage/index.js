'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class HtmlPage {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;

        this.html = null
    }

    get main() {
        const main = this._setHtml
            .then(() => this._saveHtmlPage)
            .catch(this._handleError);

        return main;
    }

    get _setHtml() {
        const setHtml = vamtiger.get.fileData(this.source)
            .then(file => this.html = file.fileData)
            .catch(this._handleError);

        return setHtml;
    }

    get _saveHtmlPage() {
        return new Promise((resolve, reject) => {
            const destinationFile = vamtiger.get.writeStream(this.destination);

            destinationFile
                .on('finish', resolve)
                .on('error', reject);

            destinationFile.write(this.html);

            destinationFile.end();
        });
    }

    _handleError(error) {
        throw error
    }
}

module.exports = parameters => new HtmlPage(parameters).main;