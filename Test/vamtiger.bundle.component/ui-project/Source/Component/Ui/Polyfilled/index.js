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
        this._css = css;

        this.innerHTML = html;
    }

    set _css(css) {
        if (!this.constructor._setCss) {
            this.constructor._setCss = true;

            this._style = css;
        }
    }

    set _style(css) {
        const style = document.createElement('style');

        style.innerHTML = css;

        document.head.appendChild(style);
    }
}

CustomElement._setCss = false;

export default CustomElement;