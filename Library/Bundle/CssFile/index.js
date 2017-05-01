'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class CssFile {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;
    }

    get main() {
        const bundleCssFile = this.bundleCssFile
            .catch(this._handleError);

        return bundleCssFile;
    }

    get bundleCssFile() {
        return new Promise((resolve, reject) => {
            vamtiger.get.readStream(this.source)
                .pipe(vamtiger.bundle.css({filePath: this.source}))
                .pipe(vamtiger.get.writeStream(this.destination))
                .on('finish', resolve)
                .on('error', reject);
        });
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new CssFile(parameters).main;