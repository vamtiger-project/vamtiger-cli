'use strict';

class UiSource {
    constructor(sourcePath) {
        this.sourcePath = sourcePath;
        
        this.sourceFolders = null;
    }

    main() {
        return new Promise((resolve, reject) => {
            console.log(this.sourcePath)
        });
    }

    get _sourceFolders() {
        const sourceFolders = Array.from(UiSource.sourceFolders);
        
        return sourceFolders;
    }

    static get sourceFolders() {
        const relativeSourceFolders = [
                'Ui',
                'Ui/Css',
                'Ui/Css/Selector',
                'Ui/Css/Reset',
                'Ui/Css/Layout',
                'Ui/Css/Appearance',
                'Ui/Css/Behaviour'
            ],
            sourceFolders = new Set();

        relativeSourceFolders
            .map(relativePath => path.resolve(this.sourceFolder, relativePath))
            .forEach(absolutePath => sourceFolders.add(absolutePath));

        return sourceFolders;
    }
}

module.exports = sourcePath => new UiSource(sourcePath).main();