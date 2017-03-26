'use strict';

import html from '../Html/index.js';
import css from './Css/index.js';

class CustomElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._initializeUi;
    }

    get _initializeUi() {
        this.attachShadow(this._shadowDomPrams);

        this._css = css;

        this.shadowRoot.innerHTML = html;
    }

    get _shadowDomPrams() {
        const shadowDomPrams = {
            mode: 'open'
        };

        return shadowDomPrams;
    }

    set _css(css) {
        if (!this.constructor._setCss) {
            this.constructor._setCss = true;

            this._style = css;
        }
    }

    set _style(css) {
        const style = document.createElement('style');

        style.dataset.for = CustomElement.name;
        style.cssText = css;

        document.head.appendChild(style);
    }
}

CustomElement._setCss = false;

export default CustomElement;