'use strict';

const path = require('path'),

    CustomElementBoilerplate = require('../CustomElementBoilerplate').class,
    
    boilerPlatePath = path.resolve(__dirname, 'Boilerplate');

class PollyiflledCustomElementBoilerplate extends CustomElementBoilerplate {
    constructor(configuration) {
        super();

        console
    }

    get _boilerplateDirectoryPath() {
        const boilerplateDirectoryPath = path.resolve(__dirname, 'Boilerplate');

        return boilerplateDirectoryPath;
    }
}

PollyiflledCustomElementBoilerplate.booya = 'booy!';

module.exports = configuration => new PollyiflledCustomElementBoilerplate(configuration).main();