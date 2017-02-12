'use strict';

const fs = require('fs');

class ReadStream {
    constructor(filePath) {
        this.path = filePath;
    }
    
    main() {
        const newReadStream = fs.createReadStream(this.path);

        return newReadStream;
    }
}

module.exports = filePath => new ReadStream(filePath).main();