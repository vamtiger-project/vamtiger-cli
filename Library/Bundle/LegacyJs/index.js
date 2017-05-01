'use strict';

const TranspiledJs = require('../TranspiledJs').class;

class BundleLegacyJs extends TranspiledJs {
    constructor({filePath}) {
        super({filePath});

        this.legacy = true;
        this.transpile = true;
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

exports.main = filePath => new BundleLegacyJs(filePath).main();