'use strict';

const path =  require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class UpdateFile {
    constructor({file, replace, replaceWith}) {
        this.file = file;
        this.replace = replace;
        this.replaceWith = replaceWith;

        this.fileText = null;
    }

    get main() {
        const main = this._setDependencies
            .then(() => this._updateFile)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _setDependencies() {
        const setDependencies = vamtiger.get.fileData(this.file)
            .then(file => this.fileText = file.fileData)
            .catch(this._handleError);

        return setDependencies;
    }

    get _updateFile() {
        return new Promise((resolve, reject) => {
            const updateFile = this.replace && this.replaceWith ? true : false;

            let fileText,
                updatedFile;

            if (updateFile) {
                fileText = this.fileText.replace(this.replace, this.replaceWith);

                updatedFile = vamtiger.get.writeStream(this.file)
                    .on('finish', resolve)
                    .on('error', this._handleError);

                updatedFile.write(fileText);

                updatedFile.end();
            } else
                reject(new Error(`File not updated: \n${this.file}`));
        });
    }
}

module.exports = parameters => new UpdateFile(parameters).main;