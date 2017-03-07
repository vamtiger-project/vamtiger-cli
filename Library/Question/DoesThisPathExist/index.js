'use strict';

const path = require('path'),

    XRegExp = require('xregexp'),

    VamtigerPath = path.resolve(__dirname, '../'.repeat(3)),
    Vamtiger = require(VamtigerPath),
    
    vamtiger = new Vamtiger();

class DoesThisPathExist {
    constructor(question, absolutePath) {        
        this.question = question;
        this.path = absolutePath;

        this._yes = null;
        this._no = null;

        this.yes = true;
    }

    answer(error) {
        const answer = {
            question: this.question,
            path: this.path,
        };
        
        let pathDoesNotExistError;
        
        if (error) {
            pathDoesNotExistError = XRegExp.match(error.code, vamtiger.regex.error.code.ENOENT);

            if (pathDoesNotExistError)
                this.yes = false;
            else
                throw error;
        }

        answer.yes = this.yes;
        answer.no = this.no;

        return answer;
    }

    main() {
        const main = this.ask;

        return main;
    }

    get ask() {
        return new Promise((resolve, reject) => {
            vamtiger.get.pathInfo(this.path)
                .then(pathInfo => this.answer(null))
                .catch(error => this.answer(error))
                .then(resolve)
                .catch(reject);
        })
    }

    set yes(yes) {
        this._yes = yes;
        
        if (!this._yes)
            this._no = true;
        else
            this._no = false;
    }

    get yes() {
        return this._yes;
    }

    get no() {
        return this._no;
    }
}

module.exports = (question, absolutePath) => new DoesThisPathExist(question, absolutePath).main();