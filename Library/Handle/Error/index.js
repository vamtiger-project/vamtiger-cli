'use strict';

class HandleError {
    constructor({error, classification}) {
        this.error = error;
        this.classification = classification;
    }

    main() {
        let main;

        if (!this.classification)
            this.throw();
    }

    throw() {
        throw this.error;
    }
}

module.exports = parameters => new HandleError(parameters).main();