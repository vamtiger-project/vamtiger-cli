'use strict';

const fs = require('fs');

class WriteStream {
    constructor(filePath) {
        this.filePath = filePath;
    }

    main() {
        const writeStream = fs.createWriteStream(this.filePath);

        return writeStream;
    }
}

module.exports = filePath => new WriteStream(filePath).main();