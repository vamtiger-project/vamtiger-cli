'use strict';

class Question {
    static get 'Does this path exist?'() {
        const question = require('./DoesThisPathExist');

        return question;
    }
}

module.exports = (question, info) => Question[question](question, info);