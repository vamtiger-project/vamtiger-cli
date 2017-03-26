'use strict';

const path = require('path'),
    
    VamtigerPath = path.resolve(__dirname, '../'.repeat(2)),
    Vamtiger = require(VamtigerPath),

    vamtiger = new Vamtiger();

class Regex {
    static get commas() {
        const regex = /[,]/g;

        return regex;
    }

    static get htmlBody() {
        const regex = require('./HtmlBody');

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
    static get elementName() {
        const regex = require('./ElementName').regex;

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

    static get uiIgnoreCss() {
        const uiIgnoreCss = require('./UiIgnoreCss');

        return uiIgnoreCss;
    }

    static get uiIgnoreCssMain() {
        const uiIgnoreCssMain = require('./UiIgnoreCssMain');

        return uiIgnoreCssMain; 
    }

    static get error() {
        const regex = require('./Error');

        return regex;
    }

    static get Polyfilled() {
        const regex = vamtiger.get.regex({
            pattern: 'Polyfilled',
            explicit: true
        });

        return regex;
    }

    static get DefaultInPath() {
        const regex = vamtiger.get.regex({
            pattern: 'Default(?=\/)'
        });

        return regex;
    }

    static get sourceFolder() {
        const regex = require('./SourceFolder');

        return regex;
    }

    static get sourcePath() {
        const regex = require('./SourcePath');

        return regex;
    }

    static get uiStylesheet() {
        const regex = require('./UiStylesheet');

        return regex;
    }

    static get componentPreviewHtml() {
        const regex = require('./ComponentPreviewHtml');

        return regex;
    }

    static get componentName() {
        const regex = require('./ComponentName');

        return regex;
    }
};

module.exports = Regex;