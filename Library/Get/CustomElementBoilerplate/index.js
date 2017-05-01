'use strict';

const path = require('path'),
    XRegExp = require('xregexp'),

    BundleUiPath = path.resolve(__dirname, '../'.repeat(3), 'Library/Bundle/Ui'),
    BundleUi = require(BundleUiPath).class;

class CustomElementBoilerplate extends BundleUi {
    constructor(configuration) {
        super(arguments);

        this._configuration = arguments;

        this.html = null;
        this.title = null;
        this.constructorName = null;
        this.baseClass = null;
        this.boilerplate = null;

        this._rawBoilerplate = null;
    }
    
    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.html = this._html;
        this.title = this._title;
        this.constructorName = this.get.camelCase(this.title, false);
        this.baseClass = this._baseClass
        
        this.get.fileData(this._boilerplatePath)
            .then(fileData => this._rawBoilerplate = fileData.fileText)
            .then(() => this.boilerplate = this._boilerplate)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        if (this._isGulpBuffer) {
            this.buffer.contents = new Buffer(this.boilerplate);
            this.boilerplate = this.buffer;
        }
        
        this.stream.push(this.boilerplate);

        done();
    }

    get _html() {
        const html = this._isGulpBuffer ? 
            this.buffer.contents.toString()
            :
            this.buffer.toString();

        return html;
    }

    get _title() {
        let match,
            title;

        if (this._configuration.ignoreTitle)
            title = 'CustomElement';
        else {
            match = XRegExp.exec(this.html, this.regex.htmlTitle);

            if (match)
                title = match.titleText;
        }

        return title;
    }

    get _baseClass() {
        let baseClass = 'HTMLElement',
            titleMatch = XRegExp.exec(this.html, this.regex.htmlTitle),
            match = titleMatch ? 
                XRegExp.exec(titleMatch.htmlTitle, this.regex.baseClassFromTitle)
                :
                null;

        if (match)
            baseClass = match.baseClass;

        return baseClass;
    }

    get _boilerplateDirectoryPath() {
        const boilerplateDirectoryPath = path.resolve(__dirname, 'Boilerplate');

        return boilerplateDirectoryPath;
    }

    get _boilerplatePath() {
        const boilerplatePath = path.resolve(
            this._boilerplateDirectoryPath, 
            'CustomElement',
            'index.js'
        );

        return boilerplatePath;
    }

    get _boilerplate() {
        const match = XRegExp.exec(this._rawBoilerplate, this.regex.classDeclaration);

        let boilerplate = '';
        
        if (match)
            boilerplate = `${match.before}class ${this.constructorName} extends ${this.baseClass} ${match.after}`

        return boilerplate;
    }
}

exports.class = CustomElementBoilerplate;

exports.main = configuration => new CustomElementBoilerplate(configuration).main();