'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(4)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class BundleJs {
    constructor({source, destination, codeOnly}) {
        this.source = source;
        this.destination = destination ? destination : this._destination;
        this.codeOnly = codeOnly;
        
        this.jsBundle = undefined;
        this.destinationFile = undefined;
    }

    get main() {
        const main = this.bundleJs
            .catch(this._handleError);

        return main;
    }

    get bundleJs() {
        const bundleJs = this.setJsBundle
            .then(() => vamtiger.create.pathFolders({absolutePath: this.destination}))
            .then(() => this.setDestinationFile)
            .then(() => this.saveJsBundle)
            .catch(this._handleError);

        return bundleJs;
    }

    get _destination() {
        const destination = XRegExp.replace(this.source, vamtiger.regex.sourceFolder, 'Bundle/Js');

        return destination;
    }

    get setJsBundle() {
        const parameters = {
                filePath: this.source
            },
            setJsBundle = vamtiger.get.jsBundle(parameters)
                .then(jsBundle => this.jsBundle = jsBundle)
                .catch(this._handleError);

        return setJsBundle;
    }

    get setDestinationFile() {
        const destinationFile = vamtiger.get.writeStream(this.destination);

        this.destinationFile = destinationFile;
    }

    get saveJsBundle() {
        return new Promise((resolve, reject) => {
            this.destinationFile
                .on('finish', resolve)
                .on('error', reject);

            if (this.codeOnly)
                this.destinationFile.write(this.jsBundle.code);
            else
                this.destinationFile.write(this.jsBundle.codeWithSourceMap);
            
            this.destinationFile.end();
        });
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new BundleJs(parameters).main;