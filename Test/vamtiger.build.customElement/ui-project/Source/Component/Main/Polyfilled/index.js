'use strict';

import CustomElementCore from '../Core/Polyfilled/index.js';

class Component extends CustomElementCore {
    constructor() {
        super();
    }

    static get name() {
        const name = 'vamtiger-custom-element';
    }
}

customElements.define(Component.name, Component);