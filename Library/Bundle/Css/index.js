'use strict';

const TranspiledJs = require('../TranspiledJs').class;

class BundleCss extends TranspiledJs {
    constructor(params) {
        super(params);

        this.cssBundle = null;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.get.cssBundle(this)
            .then(bundle => this.cssBundle = bundle.css)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        if (this._isGulpBuffer) {
            this.buffer.contents = new Buffer(this.cssBundle);
            this.cssBundle = this.buffer;
        }
        
        this.stream.push(this.cssBundle);

        done();
    }
}

exports.main = filePath => new BundleCss(filePath).main();