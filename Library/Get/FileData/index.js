'use strict';

const fs = require('fs'),
    path = require('path');

class FileData {
    constructor(filePath) {
        this.filePath = filePath;
        this.fileType = path.extname(this.filePath).replace(/\W/g, '');
        this.encoding = 'utf-8';
        this.fileText = null;
    }
    
    main() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, this.encoding, (error, fileText) => {
                if (error)
                    reject(error);
                else {
                    this.fileText = fileText;

                    resolve(this);
                }
            })
        });
    }
}

module.exports = filePath => new FileData(filePath).main();