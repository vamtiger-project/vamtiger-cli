'use strict';

const path =  require('path'),

    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class PolyfilledComponentMain {
    constructor({source, destination}) {
        this.source = source;
        this.destination = destination;

        this.polyfilledFolder = path.dirname(this.destination);

        this.parameters = this._parameters;
    }

    main() {
        const main = this._buildPolyfilledComponentMain
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _parameters() {
        const parameters = {
            folderContent: {
                absolutePath: this._mainFolderPath
            }
        };

        return parameters;
    }

    get _mainFolderPath() {
        const mainFolderPath = path.resolve(this.destination, '../..');

        return mainFolderPath;
    }

    get _buildPolyfilledComponentMain() {
        return new Promise(async resolve => {
            const folderContent = await vamtiger.get.folderContent(this.parameters.folderContent).catch(this._handleError),
                createPolyfilledFolder = !folderContent.some(content => XRegExp.match(content, vamtiger.regex.Polyfilled)),
                source = await vamtiger.get.fileData(this.source).catch(this._handleError),
                sourceText = source.fileData,
                destinationText = XRegExp.replace(sourceText, vamtiger.regex.DefaultInPath, 'Polyfilled');

            let destination;

            if (createPolyfilledFolder)
                await vamtiger.create.folder(this.polyfilledFolder).catch(this._handleError);

            destination = vamtiger.get.writeStream(this.destination)
                .on('finish', resolve)
                .on('error', this._handleError);

            destination.write(destinationText);

            destination.end();
        });
    }
}

module.exports = parameters => new PolyfilledComponentMain(parameters).main();