'use strict';

const path = require('path'),
    fs = require('fs');

class PathInfo {
    constructor(absolutePath) {
        this.absolutePath = absolutePath;
    }

    main() {
        const main = this._getPathInfo();

        return main;
    }

    _getPathInfo() {
        return new Promise((resolve, reject) => {
            const pathInfo = {
                parent: path.dirname(this.absolutePath),
                path: this.absolutePath,
                stats: null
            };
            
            fs.stat(this.absolutePath, (error, stats) => {
                if (error)
                    reject(error)
                else {
                    pathInfo.stats = stats;
                    
                    resolve(pathInfo);
                }
            })
        });
    }
}

module.exports = absolutePath => new PathInfo(absolutePath).main();