'use strict';

const formatJs = require('js-beautify').js_beautify,
        CustomElement = `'use strict';

class WebAppSource extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = \`
            <style>
                /** some css **/
            </style>

            <some-html></some-html>
        \`;

        // some js
    }
}

window.customElements.define('web-app-source', WebAppSource);
        `;

module.exports.expected = formatJs(CustomElement);