'use strict';

class Run {
    static get task() {
        const task = require('./Task');

        return task;
    }
};

module.exports = Run;