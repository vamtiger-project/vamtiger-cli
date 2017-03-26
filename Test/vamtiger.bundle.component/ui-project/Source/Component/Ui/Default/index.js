'use strict';

import html from '../Html/index.js';
import css from './Css/index.js';

class CustomElement extends HTMLElement {
    constructor() {
        super();
        console.log('CustomElement Constructor');

        this._initializeUi;
    }

    get _initializeUi() {
        this.attachShadow(this._shadowDomPrams);

        this.shadowRoot.innerHTML = `
            ${css}

            ${html}
        `;
    }

    get _shadowDomPrams() {
        const shadowDomPrams = {
            mode: 'open'
        };

        return shadowDomPrams;
    }
}

export default CustomElement;