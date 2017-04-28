'use strict';

const TranspiledJs = require('../TranspiledJs').class;

class BundleJs extends TranspiledJs {
    constructor(filePath, dontTranspile) {
        super(filePath);
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
}

exports.main = filePath => new BundleJs(filePath).main();