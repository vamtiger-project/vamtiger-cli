'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class CssBundle {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;
    }

    get main() {
        const main = this._saveCssBundle
            .catch(this._handleError);

        return main;
    }

    get _saveCssBundle() {
        return new Promise((resolve, reject) => {
            const sourceFile = vamtiger.get.readStream(this.source),
                destinationFile = vamtiger.get.writeStream(this.destination);

            sourceFile
                .pipe(vamtiger.bundle.css({filePath: this.source}))
                .pipe(destinationFile)
                .on('finish', resolve)
                .on('error', reject);
        });
    }

    _handleError(error) {
        throw error
    }
}

module.exports = parameters => new CssBundle(parameters).main;