'use strict';

class Build {
    static get component() {
        const component = require('./Component');

        return component;
    }

    static get uiCss() {
        const uiCss = require('./UiCss');

        return uiCss;
    }

    static get uiHtml() {
        const uiHtml = require('./UiHtml');

        return uiHtml;
    }

    static get polyfilledComponentMain() {
        const polyfilledComponentMain = require('./PolyfilledComponentMain');

        return polyfilledComponentMain;
    }
}

module.exports = Build;