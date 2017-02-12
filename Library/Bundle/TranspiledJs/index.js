'use strict';

const path = require('path'),
    
    through = require('through2'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath);

class BundleJs extends Vamtiger {
    constructor(filePath) {
        super();
        
        this.filePath = filePath;

        this.stream = null;
        this.buffer = null;
        this.js = null;
        this._transpiledJs = null;
        this.transpiledJs = null;
        this.transpile = true;
    }

    main() {
        this.stream = through.obj(
            this._transform.bind(this), 
            this._end.bind(this)
        );

        return this.stream;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.get.jsBundle(this)
            .then(jsBundle => this.jsBundle = jsBundle)
            .then(() => this.get.transpiledJs(this))
            .then(transpiledJs => this.transpiledJs = transpiledJs)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        let transpiledJs = [
            this.transpiledJs.code,
            this.transpiledJs.sourceMap
        ].join('\n');

        if (this._isGulpBuffer) {
            this.buffer.contents = new Buffer(transpiledJs);
            transpiledJs = this.buffer;
        }
        
        this.stream.push(transpiledJs);

        done();
    }

    get _isGulpBuffer() {
        let isGulpBuffer = false;

        if (this.buffer.contents)
            isGulpBuffer = true;

        return isGulpBuffer;
    }
}

exports.main = filePath => new BundleJs(filePath).main();

exports.class = BundleJs;