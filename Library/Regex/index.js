'use strict';

class Regex {
    static get commas() {
        const regex = /[,]/g;

        return regex;
    }
    
    static get bodyInnerHtml() {
        const regex = require('./BodyInnerHtml').regex;

        return regex;
    }

    static get styleSheet() {
        const regex = require('./StyleSheet').regex;

        return regex;
    }

    static get href() {
        const regex = require('./Href').regex;

        return regex;
    }

    static get ignoreElement() {
        const regex = require('./IgnoreElement').regex;

        return regex;
    }
    
    static get htmlTitle() {
        const regex = require('./HtmlTitle').regex;

        return regex;
    }

    static get nonWords() {
        const regex = require('./NonWords').regex;

        return regex;
    }

    static get classDeclaration() {
        const regex = require('./ClassDeclaration').regex;

        return regex;
    }

    static get baseClassFromTitle() {
        const regex = require('./BaseClassFromTitle').regex;

        return regex;
    }
    
    static get elementId() {
        const regex = require('./ElementId').regex;

        return regex;
    }

    static get css() {
        const regex = require('./Css').regex;

        return regex;
    }

    static get cssBlock() {
        const regex = require('./CssBlock').regex;

        return regex;
    }

    static get error() {
        const regex = require('./Error');

        return regex;
    }
};

module.exports = Regex;