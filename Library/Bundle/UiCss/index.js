'use strict';

const formatJs = require('js-beautify').js_beautify,
    
    BundleUi = require('../Ui').class;

class BundleUiCss extends BundleUi {
    constructor(filePath) {
        super(filePath);

        this.filePath = filePath;
        
        this.bodyInnerHtml = null;
        this.cssBundle = null;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.get.cssFiles(this)
            .then(cssFiles => this.cssFiles = cssFiles)
            .then(() => this.get.cssBundles(this.cssFiles))
            .then(cssBundles => this._cssBundles = cssBundles)
            .then(() => this.ui = this._ui)
            .then(() => done())
            .catch(this._handleError);
    }

    get _ui() {
        const ui = `
            'use strict';

            const css = \`${this.css}\`;

            export default css;
        `;

        return formatJs(ui);
    }
}

exports.main = filePath => new BundleUiCss(filePath).main();

exports.class = BundleUiCss;