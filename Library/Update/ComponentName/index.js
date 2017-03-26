'use strict';

const path =  require('path'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class ComponentName {
    constructor({htmlPath, componentMainPath, polyfilledComponentMainPath}) {
        this.htmlPath = htmlPath;
        this.componentMainPath = componentMainPath;
        this.polyfilledComponentMainPath = polyfilledComponentMainPath;
        this.html = null;
        this.componentMain = null;
    }

    get main() {
        const main = this._setDependencies
            .then(() => this._updateComponentName)
            .catch(this._handleError);

        return main;
    }

    _handleError(error) {
        throw error
    }

    get _setDependencies() {
        const setDependencies = Promise.all([
            this._setHtml,
            this._setComponentMain
        ]);

        setDependencies.catch(this._handleError);

        return setDependencies;
    }

    get _setHtml() {
        const setHtml = vamtiger.get.fileData(this.htmlPath)
            .then(html => this.html = html.fileData)
            .catch(this._handleError);

        return setHtml;
    }

    get _setComponentMain() {
        const setComponentMain = vamtiger.get.fileData(this.componentMainPath)
            .then(componentMain => this.componentMain = componentMain.fileData)
            .catch(this._handleError);

        return setComponentMain;
    }

    get _updateComponentName() {
        const customElementName = vamtiger.get.customElementName({
                html: this.html
            }),
            componentName = vamtiger.get.componentName({
                componentMain: this.componentMain
            }),
            updateComponentName = customElementName !== componentName;

        let tasks;

        if (updateComponentName)
            tasks = Promise.all([
                vamtiger.update.file({
                    file: this.componentMainPath,
                    replace: componentName,
                    replaceWith: customElementName
                }),

                vamtiger.update.file({
                    file: this.polyfilledComponentMainPath,
                    replace: componentName,
                    replaceWith: customElementName
                })
            ]);

        if (tasks)
            tasks.catch(this._handleError);

        return tasks;
    }
}

module.exports = parameters => new ComponentName(parameters).main;