'use strict';

const path =  require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class UiHtml {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;
        
        this.bundleUiHtml = this._bundleUiHtml;
    }

    main() {
        const main = this._buildUiHtml
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _buildUiHtml() {
        return new Promise((resolve, reject) => {
            vamtiger.get.readStream(this.source)
                .pipe(vamtiger.bundle.uiHtml(this.source))
                .pipe(vamtiger.get.writeStream(this.destination))
                .on('error', reject)
                .on('finish', resolve);
        });
    }
}

module.exports = parameters => new UiHtml(parameters).main();