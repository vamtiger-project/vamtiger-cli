'use strict';

class Module {
    constructor() {
        this.name = 'ES2015 Module';
    }

    main () {
        return new Promise(async (resolve, reject) => {
            const result = await this.test();

            resolve(result);
        });
    }

    test() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve('async function works'), 500);
        })
    }
}

export default Module;