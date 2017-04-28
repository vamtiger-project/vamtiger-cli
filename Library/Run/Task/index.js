'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class Task {
    constructor({taskName, projectPath}) {
        this.taskName = taskName;
        this.projectPath = projectPath;

        this.projectInfo = undefined;
        this.verb = undefined;
        this.noun = undefined;
        this.task = undefined;
    }

    get main() {
        let main;

        this.projectInfo = this._projectInfo;
        this.verb = this.taskName;
        this.noun = this._noun;
        this.task = vamtiger[this.verb][this.noun];

        main = this.task(this)
            .catch(this.handleError);

        return main;
    }

    set pathInfo(pathInfo) {
        if (pathInfo)
            this._pathInfo = pathInfo;
    }

    get pathInfo() {
        return this._pathInfo;
    }

    get _projectInfo() {
        const projectPackagePath = path.join(
                this.projectPath,
                'package'
            ),
            projectPackage = require(projectPackagePath),
            projectInfo = projectPackage.vamtiger;

        return projectInfo;
    }

    get _noun() {
        const noun = vamtiger.get.camelCase(this.projectInfo.projectType, true);

        return noun;
    }

    handleError(error) {
        throw error;
    }
}

module.exports = parameters => new Task(parameters).main;