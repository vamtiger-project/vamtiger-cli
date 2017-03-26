'use strict';

const path =  require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class UiCss {
    constructor({source, destination, prefixed}) {
        this.source = source;
        this.destination = destination;
        this.prefixed = prefixed;
        
        this.bundleUiCss = this._bundleUiCss;
    }

    main() {
        const main = this._buildUiCss
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _buildUiCss() {
        return new Promise((resolve, reject) => {
            vamtiger.get.readStream(this.source)
                .pipe(this.bundleUiCss(this.source))
                .pipe(vamtiger.get.writeStream(this.destination))
                .on('error', reject)
                .on('finish', resolve);
        });
    }

    get _bundleUiCss() {
        const bundleUiCss = this.prefixed ?
            vamtiger.bundle.prefixedUiCss
            :
            vamtiger.bundle.uiCss;

        return bundleUiCss;
    }
}

module.exports = parameters => new UiCss(parameters).main();