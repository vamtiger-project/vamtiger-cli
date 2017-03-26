'use strict';

const formatJs = require('js-beautify').js_beautify,
    
    TranspiledJs = require('../TranspiledJs').class;

class BundleUi extends TranspiledJs {
    constructor(filePath) {
        super(filePath);

        this.filePath = filePath;
        
        this.bodyHtml = null;
        this.cssBundle = null;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.get.bodyHtml(this)
            .then(bodyInnerHtml => this.bodyHtml = bodyInnerHtml)
            .then(() => this.get.cssFiles(this))
            .then(cssFiles => this.cssFiles = cssFiles)
            .then(() => this.get.cssBundles(this.cssFiles))
            .then(cssBundles => this._cssBundles = cssBundles)
            .then(() => this.ui = this._ui)
            .then(() => done())
            .catch(this._handleError);
    }

    _end(done) {
        if (this._isGulpBuffer) {
            this.buffer.contents = new Buffer(this.ui);
            this.ui = this.buffer;
        }
        
        this.stream.push(this.ui);

        done();
    }

    set _cssBundles(cssBundles) {
        const cssBundle = cssBundles
            .map(processedFile => processedFile.bundle.css)
            .join('\n');

        this.cssBundle = cssBundle;
    }

    get _ui() {
        const ui = `
            'use strict';

            const html = \`${this.bodyHtml}\`,
                css = \`${this.css}\`;

            export default {html, css};
        `;

        return formatJs(ui);
    }

    get css() {
        const css = `
            <style>
                ${this.cssBundle}
            </style>
        `;

        return css;
    }
}

exports.main = filePath => new BundleUi(filePath).main();

exports.class = BundleUi;