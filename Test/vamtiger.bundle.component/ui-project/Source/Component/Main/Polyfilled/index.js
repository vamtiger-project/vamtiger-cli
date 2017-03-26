'use strict';

import CustomElementCore from '../../Core/Polyfilled/index.js';

class Component extends CustomElementCore {
    constructor() {
        super();
        console.log("Component Constructor");
    }

    static get elementName() {
        const name = 'some-awesome-vamtiger-element';

        return name;
    }
}

customElements.define(Component.elementName, Component);