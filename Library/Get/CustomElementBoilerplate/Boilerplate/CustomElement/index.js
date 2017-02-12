'use strict';

import html from '../ui/html/index.js';
import css from '../ui/css/index.js';

class CustomElement extends HTMLElement {
    constructor() {
        super();

        this._initializeUi;
    }

    get _initializeUi() {
        const shadowDomPrams = {
            mode: 'open'
        };
        
        this.attachShadow(shadowDomPrams);

        this.shadowRoot.innerHTML = `
            ${css}

            ${html}
        `;
    }
}