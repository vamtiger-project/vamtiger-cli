'use strict';

const path = require('path'),
    
    proxyquire = require('proxyquire'),
    Args = require('vamtiger-argv'),
    chai = require('chai'),
    sinon = require('sinon'),

    mockData = require('./MockData'),
    
    expect = chai.expect,
    stub = sinon.stub,
    
    Vamtiger = proxyquire(
        '../../',
        {
            'vamtiger-argv': Args
        }
    ),

    sourcePath = path.resolve(
        mockData.projectPath,
        'Source'
    );

describe(`vamtiger.get.jsSouceFolders should`, function () {
    it('return an array of javascript source paths', function () {
        let jsSouceFolders,
            allFoldersPresent;

        const vamtiger = new Vamtiger(),
            params = {
                projectPath: mockData.projectPath
            },
            expectedFolders = [
                path.resolve(
                    sourcePath, 
                    'JsSourceFolder'
                ),
                path.resolve(
                    sourcePath, 
                    'AnotherJsSourceFolder'
                ),
                path.resolve(
                    sourcePath, 
                    'JsSourceContainerFolder',
                    'ContainerFolder'
                ),
                path.resolve(
                    sourcePath, 
                    'JsSourceContainerFolder',
                    'AnotherContainerFolder'
                ),
                path.resolve(
                    sourcePath, 
                    'AnotherJsSourceContainerFolder',
                    'ContainerFolder'
                ),
                path.resolve(
                    sourcePath, 
                    'AnotherJsSourceContainerFolder',
                    'AnotherContainerFolder'
                ),
            ],
            test = vamtiger.get.jsSouceFolders(params)
                .then(result => jsSouceFolders = result)
                .then(() => jsSouceFolders.every(jsSouceFolder => expectedFolders.some(expectedFolder => jsSouceFolder === expectedFolder)))
                .then(result => allFoldersPresent = result)
                .then(() => expect(jsSouceFolders).to.be.ok)
                .then(() => expect(allFoldersPresent).to.be.true)
                .catch(handleError);

        return test;
    });
});

function handleError(error) {
    console.error(error.message);
    console.error(error.stack);

    throw error;
}