'use strict';

class Module {
    constructor() {
        this.name = 'ES2015 Module';
    }

    async asyncFunction () {
        const test = await asyncTest();

        console.log(test);
    }

    asyncTest() {
        return new Promise((resolve, reject) => {
            resolve((2))
        })
    }
}

export default Module;