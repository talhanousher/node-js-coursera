var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var promotionRouter = require('./routes/promotionsRoute');
var leaderRouter = require('./routes/leaderRouter');
var url = 'mongodb://localhost:27017';
var connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connect Succesfully to the Server');
}, (err) => {
    console.log('Error : ', err);
})

var port = 3000;
var hostName = 'localhost';
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function auth(req, res, next) {
    console.log(req.headers);

    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('Not Authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    if (username === 'admin' && password === 'password') {
        next();
    } else {
        var err = new Error('Not Authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}
app.use(auth);



app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

var server = http.createServer(app);
server.listen(port, hostName, () => {
    console.log('Server is Running at https://' + hostName + ":" + port);
});