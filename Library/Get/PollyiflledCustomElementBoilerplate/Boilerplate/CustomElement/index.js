'use strict';

import html from '../ui/html/index.js';
import css from '../ui/css/index.js';

class CustomElement extends HTMLElement {
    constructor() {
        super();
    }

    get connectedCallback() {
        const shadowDomPrams = {
            mode: 'open'
        };
        
        this.attachShadow(shadowDomPrams);

        this._css = css;

        this.shadowRoot.innerHTML = html;
    }

    set _css(css) {
        if (!CustomElement.constructor._setCss) {
            CustomElement.constructor._setCss = true;

            this._uiCss = css;
        }
    }

    set _uiCss(css) {
        const style = this.createElement(css);

        style.dataset.for = this.constructor.name;

        document.head.appendChild(style);
    }

    createElement(innerHTML) {
        const container = document.createElement('div');

        let element;

        container.innerHTML = innerHTML;

        element = container.firstElementChild;

        return element;
    }
}

CustomElement._setCss = false;