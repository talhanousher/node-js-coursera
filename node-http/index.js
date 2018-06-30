var http = require('http');

var hostName = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><header></header><body><h1>Hello</h1></body></html>');
});

server.listen(port,'127.0.0.1');