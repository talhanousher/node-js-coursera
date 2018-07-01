var express = require('express');
var http = require('http');
var morgan = require('morgan');
var hostName = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head></head><body><h1>Hello Express</h1></body></html>');
})

var server = http.createServer(app);

server.listen(port, hostName, () => {
    console.log('Server is running at ' + hostName + ':' + port);
})
