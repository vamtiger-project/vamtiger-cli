'use strict';

const path = require('path'),
    
    XRegExp = require('XRegExp'),
    through = require('through2'),
    
    TranspiledJs = require('../TranspiledJs').class,
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class BundleJs {
    constructor(params) {
        this.filePath = params.filePath;
        this.codeOnly = params.codeOnly;
        this.source = params.source;
        this.destination = params.destination ? params.destination : this._destination;
        this.codeOnly = params.codeOnly;
        
        this._jsBundle = undefined;
        this._transpiledJs = undefined;
        this._destinationFile = undefined;
    }

    main() {
        let main;

        if (this.filePath) {
            this.stream = through.obj(
                this._transform.bind(this), 
                this._end.bind(this)
            );

            main = this.stream;
        } else {
            main = this._bundleJs
                .catch(this._handleError);
        }

        return main;
    }

    get _destination() {
        let destination;
        
        if (this.source)
            destination = XRegExp.replace(this.source, vamtiger.regex.sourceFolder, 'Bundle/Js');

        return destination;
    }

    _transform(buffer, encoding, done) {
        this._buffer = buffer;
        
        vamtiger.get.jsBundle(this)
            .then(jsBundle => this._jsBundle = jsBundle)
            .then(() => vamtiger.get.transpiledJs(this))
            .then(transpiledJs => this._transpiledJs = transpiledJs)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        let transpiledJs = [
            this._transpiledJs.code,
            this._transpiledJs.sourceMap
        ].join('\n');

        if (this._isGulpBuffer) {
            this._buffer.contents = new Buffer(transpiledJs);
            transpiledJs = this._buffer;
        }
        
        this.stream.push(transpiledJs);

        done();
    }

    get _isGulpBuffer() {
        let isGulpBuffer = false;

        if (this._buffer.contents)
            isGulpBuffer = true;

        return isGulpBuffer;
    }

    get _bundleJs() {
        const bundleJs = this.setJsBundle
            .then(() => vamtiger.create.pathFolders({absolutePath: this.destination}))
            .then(() => this.setDestinationFile)
            .then(() => this.saveJsBundle)
            .catch(this._handleError);

        return bundleJs;
    }

    get setJsBundle() {
        const parameters = {
                filePath: this.source
            },
            setJsBundle = vamtiger.get.jsBundle(parameters)
                .then(jsBundle => this._jsBundle = jsBundle)
                .catch(this._handleError);

        return setJsBundle;
    }

    get setDestinationFile() {
        const destinationFile = vamtiger.get.writeStream(this.destination);

        this._destinationFile = destinationFile;
    }

    get saveJsBundle() {
        return new Promise((resolve, reject) => {
            this._destinationFile
                .on('finish', resolve)
                .on('error', reject);

            if (this.codeOnly)
                this._destinationFile.write(this._jsBundle.code);
            else
                this._destinationFile.write(this._jsBundle.codeWithSourceMap);
            
            this._destinationFile.end();
        });
    }

    _handleError(error) {
        console.log(error);
        
        throw error;
    }
}

exports.main = filePath => new BundleJs(filePath).main();