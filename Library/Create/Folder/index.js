'use strict';

const fs = require('fs'),
    path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class Folder extends Vamtiger {
    constructor(folder) {
        super();
        
        this.folder = folder;
    }

    main() {
        const createFolder = this.createFolder();

        return createFolder;
    }

    createFolder() {
        return new Promise((resolve, reject) => {
            fs.mkdir(this.folder, (error, stats) => {
                if (error)
                    reject(error);
                else
                    resolve(stats);
            });
        });
    }
}

module.exports = folder => new Folder(folder).main();