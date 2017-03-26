'use strict';

const http = require('http'),
    fs = require('fs'),
    path = require('path');

http.createServer((request, response) => {
    const filePath = request.url === '/' ? 
        path.resolve(__dirname, 'index.html') 
        : 
        path.resolve(__dirname, request.url.replace(/^\//, ''));
    
    respond(filePath, response)
        .then(() => response.end())
        .catch(handleError);
}).listen(80);

function respond(filePath, response) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .on('error', reject)
            .pipe(response)
            .on('finish', resolve)
            .on('error', reject)
    });
}

function handleError(error) {
    console.log('*')
    console.error(error);
}