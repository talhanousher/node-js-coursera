var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyPasrer = require('body-parser');
var dishRouter = require('./routes/dishRoutes');
var hostName = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev'));
app.use(bodyPasrer.json());
app.use('/dishes', dishRouter);

app.all('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});
app.get('/dishes/:dishId', (req, res) => {
    res.end('Will send  the dishes with id : ' + req.params.dishId);
});
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post Not supported on a specific dish with id : ' + req.params.dishId);
});
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Will Update the dish with id : ' + req.params.dishId + '\n');
    res.end("Update dish : " + req.body.name + ' with details ' + req.body.description);
});
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish : ' + req.body.name);
});


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
