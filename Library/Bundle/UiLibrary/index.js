'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),
    Args = require('vamtiger-argv'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger(),
    boilerplatePath = path.resolve(__dirname, './Boilerplate'),
    args = new Args();

class UiLibrary {
    constructor({projectPath, returnData}) {
        this.projectPath = projectPath;
        this.returnData = returnData;

        this.cssPath = this._cssPath;
        this._polyfillSourceFiles = null;
        this._jsSourceFiles = new Set();
        this.jsSourceFileParams = undefined;
    }

    get main() {
        const main = Promise.resolve()
            .then(() => this._referenceJsSource)
            .then(() => this._bundleUiLibrary)
            .then(() => this.returnData ? this._returnData : null)
            .catch(this._handleError);
        
        return main;
    }

    get _referenceJsSource() {
        let referenceJsSource;
        
        if (!this._jsSourceFiles.size)
            this._jsSourceFiles.add(this._jsPath);
        
        referenceJsSource = Promise.all([
            this._referenceJsSourceFolders,
            this._referenceJsSourceContainerFolders
        ]);

        referenceJsSource = referenceJsSource
            .catch(this._handleError);

        return referenceJsSource;
    }

    get _referenceJsSourceFolders() {
        const jsSouceFolders = args.get('jsSouceFolders');
        
        XRegExp.forEach(jsSouceFolders, vamtiger.regex.word, match => this._referenceJsSourceFile({folderName: match.word}));
    }

    get _referenceJsSourceContainerFolders() {
        const jsSouceContainerFolders = args.get('jsSourceContainerFolders'),
            jsSouceContainerFolderPaths = new Set();

        let jsSouceContainerFolder,
            jsSouceContainerFolderPath,
            referenceJsSourceContainerFolders;
        
        XRegExp.forEach(jsSouceContainerFolders, vamtiger.regex.word, match => jsSouceContainerFolderPaths.add(match.word));

        referenceJsSourceContainerFolders = Promise.all(
            Array
                .from(jsSouceContainerFolderPaths)
                .map(jsSouceContainerFolderPath => this._referenceJsSourceFiles({referenceFolder: jsSouceContainerFolderPath}))
        );

        referenceJsSourceContainerFolders = referenceJsSourceContainerFolders
            .catch(this._handleError);

        return referenceJsSourceContainerFolders;
    }

    _referenceJsSourceFile({folderName, filePath}) {
        let jsSourceFile = filePath;

        if (folderName)
            jsSourceFile = path.resolve(
                this.projectPath,
                'Source',
                folderName,
                'index.js'
            );

        if (jsSourceFile)
            this._jsSourceFiles.add(jsSourceFile);
    }

    _referenceJsSourceFiles({referenceFolder}) {
        const parameters = {
                projectPath: this.projectPath,
                referenceFolder
            },
            referenceJsSourceContainerFolder = vamtiger.get.jsSourceFiles(parameters)
                .then(jsSourceFiles => jsSourceFiles.forEach(filePath => this._referenceJsSourceFile({filePath})))
                .catch(this._handleError);

        return referenceJsSourceContainerFolder;
    }

    get _setPolyfillSourceFiles() {
        const parameters = {
                projectPath: this.projectPath,
                referenceFolder: 'Polyfill'
            },
            setPolyfillSourceFiles = vamtiger.get.jsSourceFiles(parameters)
                .then(polyfillSourceFiles => this._polyfillSourceFiles = polyfillSourceFiles)
                .catch(this._handleError);

        return setPolyfillSourceFiles;
    }

    get _bundleUiLibrary() {
        let tasks = Promise.all([
            this._bundleJsSourceFiles,
            vamtiger.save.cssBundle(this._cssParams),
            vamtiger.save.htmlPage(this._htmlParams)
        ]);

        tasks = tasks.catch(this._handleError);

        return tasks;
    }

    _jsSourceFileParams(source) {
        const params = {
                source,
                destination: XRegExp.replace(source, vamtiger.regex.sourceFolder, 'Bundle/Js'),
                codeOnly: true
            },
            mainJsFile = XRegExp.match(source, vamtiger.regex.mainSourceJsFile);

        if (mainJsFile)
            params.codeOnly = false;

        return params;
    }

    get _cssParams() {
        const params = {
            source: this._cssPath,
            destination: path.resolve(
                this.projectPath,
                'Bundle/Css/index.css'
            ) 
        };

        return params;
    }

    get _htmlParams() {
        const params = {
            source: path.resolve(
                boilerplatePath,
                'index.html'
            ),
            destination: path.resolve(
                this.projectPath,
                'Bundle/index.html'
            ) 
        };

        return params;
    }

    get _jsPath() {
        const jsPath = path.join(
            this.projectPath,
            'Source/index.js'
        );

        return jsPath;
    }

    get _cssPath() {
        const cssPath = path.resolve(
            boilerplatePath,
            'Css/index.css'
        );

        return cssPath;
    }

    get _bundleJsSourceFiles() {
        const jsSourceFileParams = Array
            .from(this._jsSourceFiles)
            .map(this._jsSourceFileParams);
            
        let bundleJsSourceFiles = Promise.all(
            jsSourceFileParams.map(vamtiger.bundle.js)
        );

        this.jsSourceFileParams = jsSourceFileParams;

        bundleJsSourceFiles = bundleJsSourceFiles
            .catch(this._handleError);

        return bundleJsSourceFiles;
    }
    
    get _returnData() {
        const data = {
            jsSourceFileParams: this.jsSourceFileParams
        };

        return data;
    }

    _handleError(error) {
        console.log(error);
        throw error;
    }
}

module.exports = parameters => new UiLibrary(parameters).main;