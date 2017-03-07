'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    sourcePath = path.resolve(__dirname, 'ui-project');

describe.skip(`vamtiger.initialize.uiProject should`, function () {
    it('create UI project', function (done) {
        const vamtiger = new Vamtiger();
            
        vamtiger.initialize.uiProject(sourcePath)
            .then(done)
            .catch(done);
    });
});