'use strict';

const path = require('path'),

    expect = require('chai').expect,
    
    Vamtiger = require('../../'),

    sourcePath = path.resolve(__dirname, 'Source');

describe.only(`vamtiger.initialize.uiSource should`, function () {
    it('create UI source folders', function (done) {
        const vamtiger = new Vamtiger(),
            expected = {
                result: false,
                path: [
                    path.resolve(sourcePath, 'Ui'),
                    path.resolve(sourcePath, 'Ui/Css'),
                    path.resolve(sourcePath, 'Ui/Css/Selector'),
                    path.resolve(sourcePath, 'Ui/Css/Reset'),
                    path.resolve(sourcePath, 'Ui/Css/Layout'),
                    path.resolve(sourcePath, 'Ui/Css/Appearance'),
                    path.resolve(sourcePath, 'Ui/Css/Behaviour')
                ]
            };
            
        vamtiger.initialize.uiSource(sourcePath)
            .then(() => evaluateResult(expected))
            .then(done)
            .catch(done);

        done();
    });
});

function evaluateResult() {
    console.log
}