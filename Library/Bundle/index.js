'use strict';

class Bundle {
    static get js() {
        const js = require('./Js').main;

        return js;
    }
    
    static get transpiledJs() {
        const js = require('./TranspiledJs').main;

        return js;
    }
    
    static get legacyJs() {
        const legacyJs = require('./LegacyJs').main;

        return legacyJs;
    }

    static get css() {
        const css = require('./Css').main;

        return css;
    }

    static get cssFile() {
        const cssFile = require('./CssFile');

        return cssFile;
    }

    static get ui() {
        const ui = require('./Ui').main;

        return ui;
    }

    static get uiOnly() {
        const uiOnly = require('./UiOnly').main;

        return uiOnly;
    }

    static get uiHtml() {
        const uiHtml = require('./UiHtml').main;

        return uiHtml;
    }

    static get uiCss() {
        const uiCss = require('./UiCss').main;

        return uiCss;
    }

    static get uiIgnoreCss() {
        const uiIgnoreCss = require('./UiIgnoreCss').main;

        return uiIgnoreCss;
    }

    static get prefixedUiCss() {
        const prefixedUiCss = require('./PrefixedUiCss').main;

        return prefixedUiCss;
    }

    static get component() {
        const component = require('./Component');

        return component;
    }

    static get componentPreview() {
        const componentPreview = require('./ComponentPreview');

        return componentPreview;
    }

    static get componentPreviewHtml() {
        const bundleComponentPreviewHtml = require('./ComponentPreviewHtml');

        return bundleComponentPreviewHtml;
    }

    static get componentPreviewCss() {
        const componentPreviewCss = require('./ComponentPreviewCss');

        return componentPreviewCss;
    }

    static get uiLibrary() {
        const uiLibrary = require('./UiLibrary');

        return uiLibrary;
    }
}

module.exports = Bundle;