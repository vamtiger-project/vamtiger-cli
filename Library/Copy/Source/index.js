'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);


class Source extends Vamtiger {
    constructor({files, folders}) {
        super();
        
        this.files = files;
        this.folders = folders;
    }
    
    main() {
        return new Promise((resolve, reject) => {
            const copySource = this.createFolders
                .then(() => this.copyFiles)
                .then(() => resolve())
                .catch(this._handleError);
        });
    }

    _handleError(error) {
        throw error;
    }

    get createFolders() {
        let createFolders = Promise.resolve(),
            createEachFolder;

        this.folders.forEach(folders => {
            createEachFolder = Promise.all(
                folders.map(folder => this.create.folder(folder))
            );

            createFolders = createFolders
                .then(createEachFolder);
        });

        return createFolders;
    }

    get copyFiles() {
        const copyFiles = Promise.all(
            this.files.map(file => this.copy.file(file))
        );

        return copyFiles;
    }
};

module.exports = copyInfo => new Source(copyInfo).main();