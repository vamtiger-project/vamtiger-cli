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

    static get ui() {
        const ui = require('./Ui').main;

        return ui;
    }

    static get uiHtml() {
        const uiHtml = require('./UiHtml').main;

        return uiHtml;
    }

    static get uiCss() {
        const uiCss = require('./UiCss').main;

        return uiCss;
    }

    static get prefixedUiCss() {
        const prefixedUiCss = require('./PrefixedUiCss').main;

        return prefixedUiCss;
    }
}

module.exports = Bundle;