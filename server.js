/**/
const express = require("express");
const app = express();
app.use(express());
app.use(express.static('public'));
app.listen(8000)

app.get('/')
/* 
let http = require('http');
let router = require('./routes/routes');

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

};

http.createServer(router.handleRequest).listen(8000);*/