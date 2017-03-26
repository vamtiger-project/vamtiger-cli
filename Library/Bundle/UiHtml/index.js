'use strict';

const formatJs = require('js-beautify').js_beautify,
    
    BundleUi = require('../Ui').class;

class BundleUiHtml extends BundleUi {
    constructor(filePath) {
        super(filePath);

        this.filePath = filePath;
        
        this.bodyHtml = null;
        this.bodyInnerHtml = true;
    }

    _handleError(error) {
        throw error;
    }

    _transform(buffer, encoding, done) {
        this.buffer = buffer;
        
        this.get.bodyHtml(this)
            .then(bodyHtml => this.bodyHtml = bodyHtml)
            .then(() => this.ui = this._ui)
            .then(() => done())
            .catch(this._handleError);
    }

    get _ui() {
        const ui = `
            'use strict';

            const html = \`${this.bodyHtml}\`;

            export default html;
        `;

        return formatJs(ui);
    }
}

exports.main = filePath => new BundleUiHtml(filePath).main();