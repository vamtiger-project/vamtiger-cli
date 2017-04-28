'use strict';

const path = require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    vamtiger = new Vamtiger();

class PathsWhichDontExist {
    constructor({absolutePath}) {
        this.absolutePath = absolutePath;

        this._pathsWhichDontExist = null;
    }

    get _main() {
        const absolutePath = this.absolutePath,
            main = this._setPathsWhichDontExist({absolutePath})
                .then(() => this.pathsWhichDontExist)
                .catch(this._handleError);

        return main
    }

    _setPathsWhichDontExist({absolutePath}) {
        return new Promise((resolve, reject) => {
            let pathExists = true;
            
            vamtiger.get.pathInfo(absolutePath)
                .catch(() => this._addPathWhichDoesNotExist({pathWhichDoesntExist: absolutePath}))
                .then(() => this._pathsWhichDontExist ? this._pathsWhichDontExist : new Set())
                .then(resolve);
        });
    }

    _addPathWhichDoesNotExist({pathWhichDoesntExist}) {
        const parentPath = path.dirname(pathWhichDoesntExist);

        let setPathsWhichDontExist;

        if (!this._pathsWhichDontExist)
            this._pathsWhichDontExist = new Set();
        
        this._pathsWhichDontExist.add(pathWhichDoesntExist);

        setPathsWhichDontExist = this._setPathsWhichDontExist({absolutePath: parentPath})
            .catch(this._handleError);

        return setPathsWhichDontExist;
    }

    get pathsWhichDontExist() {
        const pathsWichDontExist = Array.from(this._pathsWhichDontExist);

        if (pathsWichDontExist.length > 1)
            pathsWichDontExist.sort((pathA, pathB) => pathA.length >= pathB.length);

        return pathsWichDontExist;
    }

    _handleError(error) {
        throw error;
    }
}

module.exports = parameters => new PathsWhichDontExist(parameters)._main;