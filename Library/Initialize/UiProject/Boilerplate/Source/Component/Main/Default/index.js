'use strict';

import CustomElementCore from '../Core/Default/index.js';

class Component extends CustomElementCore {
    constructor() {
        super();
    }

    static get name() {
        const name = 'custom-element-name';
    }
}

customElements.define(Component.name, Component);