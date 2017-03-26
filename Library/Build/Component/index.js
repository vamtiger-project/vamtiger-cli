'use strict';

const path =  require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class Component {
    constructor({htmlSourceFile}) {
        this.htmlSourceFile =  htmlSourceFile;
        this.taskParameters = this._taskParameters;
    }

    main() {
        const main = this._tasks
            .then(() => this._secondaryTasks)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error;
    }

    get _tasks() {
        const tasks = Promise.all([
                vamtiger.build.uiHtml(this.taskParameters.uiHtml),
                vamtiger.build.uiCss(this.taskParameters.defaultUiCss),
                vamtiger.build.uiCss(this.taskParameters.polyfilledUiCss),
                vamtiger.build.polyfilledComponentMain(this.taskParameters.polyfilledComponentMain),
            ]);

        return tasks;
    }

    get _secondaryTasks() {
        const tasks = Promise.all([
            vamtiger.update.componentName({
                htmlPath: this.htmlSourceFile,
                componentMainPath: this.taskParameters.polyfilledComponentMain.source,
                polyfilledComponentMainPath: this.taskParameters.polyfilledComponentMain.destination
            })
        ]);

        return tasks;
    }

    get _taskParameters() {
        const taskParameters = {
            uiHtml: {
                source: this.htmlSourceFile,
                destination: this._uiHtmlBuildPath
            },
            defaultUiCss: {
                source: this.htmlSourceFile,
                destination: this._defaultUiCssBuildPath
            },
            polyfilledUiCss: {
                source: this.htmlSourceFile,
                destination: this._polyfilledUiCssBuildPath,
                prefixed: true
            },
            polyfilledComponentMain: {
                source: this._defaultComponentMainBuildPath,
                destination: this._polyfilledComponentMainBuildPath,
            }
        };

        return taskParameters;
    }

    get _uiHtmlBuildPath() {
        const absolutePath = path.resolve(this.htmlSourceFile, '../../Component/Ui/Html/index.js');

        return absolutePath;
    }

    get _defaultUiCssBuildPath() {
        const absolutePath = path.resolve(this.htmlSourceFile, '../../Component/Ui/Default/Css/index.js');

        return absolutePath;
    }

    get _polyfilledUiCssBuildPath() {
        const absolutePath = path.resolve(this.htmlSourceFile, '../../Component/Ui/Polyfilled/Css/index.js');

        return absolutePath;
    }

    get _defaultComponentMainBuildPath() {
        const absolutePath = path.resolve(this.htmlSourceFile, '../../Component/Main/Default/index.js');

        return absolutePath;
    }

    get _polyfilledComponentMainBuildPath() {
        const absolutePath = path.resolve(this.htmlSourceFile, '../../Component/Main/Polyfilled/index.js');

        return absolutePath;
    }
}

module.exports = parameters => new Component(parameters).main();