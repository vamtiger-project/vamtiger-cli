'use strict';

const path = require('path'),
    
    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class ComponentName {
    constructor({componentMain}) {
        this.componentMain = componentMain;
    }

    get main() {
        return this.componentName;
    }

    get componentName() {
        const match = XRegExp.exec(this.componentMain, vamtiger.regex.componentName),
            componentName = match ? match.componentName : '';

        return componentName;
    }
}

module.exports = parameters => new ComponentName(parameters).main;