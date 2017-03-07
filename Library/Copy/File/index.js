'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class CopyFile extends Vamtiger {
    constructor({source, destination}) {
        super();
        
        this._source = source;
        this._destination = destination;
    }

    main() {
        const copyFile = this.copyFile;

        return copyFile
    }

    get source() {
        return this._source;
    }

    get destination() {
        return this._destination;
    }

    get copyFile() {
        return new Promise((resolve, reject) => {
            this.get.readStream(this.source)
                .pipe(this.get.writeStream(this.destination))
                .on('finish', resolve)
                .on('error', reject);
        });
    }
}

module.exports = file => new CopyFile(file).main();