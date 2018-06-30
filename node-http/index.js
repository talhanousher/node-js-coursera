var http = require('http');
var fs = require('fs');
var path = require('path');
var hostName = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
    // console.log(req.headers);
    console.log('Request For : ' + req.url + ' by Method : ' + req.method);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><head></head><body><h1>Hello</h1></body></html>');
    console.log(req.method);
    console.log(req.url);
    if (req.method === 'GET') {
        var fileUrl;
        if (req.url === '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }

        var filePath = path.resolve(__dirname + '/public' + fileUrl);
        var fileExt = path.extname(filePath);
        // console.log(filePath)
        if (fileExt === '.html') {
            console.log(__dirname);
            console.log(filePath);
            fs.exists(filePath, (exists) => {
                console.log(exists, 'exists')
                if (exists) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><head><title>404</title></head><body><h1>404</h1><p>Page Not Found</p></body></html>')
                }
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><head><title>404</title></head><body><h1>404</h1><p>Page Not HTML</p></body></html>')
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><head><title>404</title></head><body><h1>404</h1><p>Page Not GET</p></body></html>')

    }
});

server.listen(port, '127.0.0.1');