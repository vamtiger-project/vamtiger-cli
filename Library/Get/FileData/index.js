'use strict';

const fs = require('fs'),
    path = require('path');

class FileData {
    constructor([filePath, asBuffer]) {
        this.filePath = filePath;
        this.fileType = path.extname(this.filePath).replace(/\W/g, '');
        this.encoding = asBuffer ? null : 'utf-8';
        this.fileData = null;
        this.asBuffer = asBuffer;
    }
    
    main() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, this.encoding, (error, fileData) => {
                if (error)
                    reject(error);
                else {
                    this.fileData = fileData;
                    
                    resolve(this);
                }
            })
        });
    }
}

module.exports = (...parameters) => new FileData(parameters).main();