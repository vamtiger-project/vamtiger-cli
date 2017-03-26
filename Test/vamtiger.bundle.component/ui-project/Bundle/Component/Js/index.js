'use strict';

addEventListener('load', event => {
    const polyfill = document.createElement('script'),
        component = document.createElement('script');
    
    polyfill.src = 'Js/custom-elements.min.js';

    if (window.customElements) {
        component.src = 'Default/index.js';
        document.head.appendChild(component);
    } else {
        component.src = 'Polyfilled/index.js';
        polyfill.addEventListener('load', event => document.head.appendChild(component))
        document.head.appendChild(polyfill);
    }
});