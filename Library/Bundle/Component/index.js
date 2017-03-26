'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class Component {
    constructor({defaultComponentMainFile}) {
        this._sourcePath = null;
        this.sourcePath = defaultComponentMainFile;
        this.defaultComponentMainFile = defaultComponentMainFile;
        this.polyfilledComponentMainFile = this._polyfilledComponentMainFile;
        this.componentPreviewFile = this._componentPreviewFile;
        this.htmlPath = this._htmlPath;
    }
    
    main() {
        const main = this._setDependencies
            .then(() => this._tasks)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _htmlPath() {
        const htmlPath = path.resolve(this._sourcePath, 'Ui/index.html');

        return htmlPath;
    }

    get _polyfilledComponentMainFile() {
        const polyfilledComponentMainFile = XRegExp.replace(this.defaultComponentMainFile, vamtiger.regex.DefaultInPath, 'Polyfilled');

        return polyfilledComponentMainFile;
    }

    set sourcePath(defaultComponentMainFile) {
        const match = XRegExp.exec(defaultComponentMainFile, vamtiger.regex.sourcePath);

        this._sourcePath = match ? match.sourcePath : null;
    }

    get sourcePath() {
        return this._sourcePath;
    }

    get _componentPreviewFile() {
        const componentPreviewFile = path.resolve(this.sourcePath, 'Ui', 'index.html');

        return componentPreviewFile;
    }

    get _setDependencies() {
        const setDependencies = Promise.all([
            vamtiger.build.component({
                htmlSourceFile: this.htmlPath
            })
        ]);

        setDependencies.catch(this._handleError);

        return setDependencies;
    }

    get _tasks() {
        const tasks = Promise.all([
            this.bundleComponent({
                source: this.defaultComponentMainFile, 
                destination: this.getDestination(this.defaultComponentMainFile)
            }),
            this.bundleComponent({
                source: this.polyfilledComponentMainFile, 
                destination: this.getDestination(this.polyfilledComponentMainFile)
            }),
            vamtiger.bundle.componentPreview({
                source: this.componentPreviewFile,
                destination: this.getDestination(this.componentPreviewFile)
            })
        ]);

        tasks.catch(this._handleError);

        return tasks;
    }

    getDestination(source) {
        const componentBundlePath = path.resolve(
                path.dirname(this.sourcePath),
                'Bundle',
                'Component'
            );

        let destination;

        if (source === this.defaultComponentMainFile)
            destination = path.resolve(
                componentBundlePath,
                'Default',
                'index.js'
            );
        else if (source === this.polyfilledComponentMainFile)
            destination = path.resolve(
                componentBundlePath,
                'Polyfilled',
                'index.js'
            );
        else if (source === this.componentPreviewFile)
            destination = path.resolve(
                componentBundlePath,
                'index.html'
            );

        return destination;
    }

    bundleComponent({source, destination}) {
        return new Promise(async (resolve, reject) => {
            const parameters = {
                    filePath: source
                },
                jsBundle = await vamtiger.get.jsBundle(parameters).catch(this._handleError),
                bundledComponent = vamtiger.get.writeStream(destination)
                    .on('finish', resolve)
                    .on('error', this._handleError);

            bundledComponent.write(jsBundle.codeWithSourceMap);
            bundledComponent.end();
        });
    }
}

module.exports = parameters => new Component(parameters).main();