'use strict';
const path = require('path'),

    formatJs = require('js-beautify').js_beautify;


class CustomElement {
    constructor({html, css, js, basePath}) {
        this.regex = this._regex;
        
        this.html = this.indent(html, 2);
        this.css = this.indent(css);
        this.js = this.indent(js);
        this._elementName = null;
        this.elementName = path.basename(path.dirname(basePath));
    }

    set elementName(elementName) {
        this._elementName = Array.from(elementName)
            .map((letter, index) => this.dashLetter(letter, index))
            .join('');
    }

    get elementName() {
        return this._elementName;
    }

    get _regex() {
        const regex = {
            newLines: /\n/g,
            capitalLetter: /[A-Z]/,
            nonWord: /\W/
        }

        return regex;
    }

    main() {
        const customElement = `
            'use strict';

            class ${this.name} extends HTMLElement {
                constructor() {
                    super();
                    
                    this.attachShadow({
                        mode: 'open'
                    });

                    this.shadowRoot.innerHTML = ${this.shadowRoot};
                }

                static get elementName() {
                    const elementName = '${this.elementName}';

                    return elementName;
                }
            }

            export default ${this.name};
        `;

        return formatJs(customElement);
    }
    
    indent(text, indentation = 4) {
        const indent = `\n${'\t'.repeat(indentation)}`,
            indentedText = text
                .replace(this.regex.newLines, indent)
                .trim();

        return indentedText;
    }

    dashLetter(letter, index) {
        if (!index)
            letter = letter.toLowerCase();
        else if (index && this.regex.capitalLetter.test(letter))
            letter = '-' + letter.toLowerCase();

        return letter;
    }

    get shadowRoot() {
        const shadowRoot = `\`
            <style>
                ${this.css}
            </style>

            ${this.html}
        \``;

        return shadowRoot.replace();;
    }

    get name() {
        const elementName = this.elementName
            .split(this.regex.nonWord)
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join('');

        return elementName;
    }
}

module.exports = data => new CustomElement(data).main();