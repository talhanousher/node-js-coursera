var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dishRputer = require('./routes/dishRoutes');
var promotionRouter = require('./routes/promotionsRoute');
var leaderRouter = require('./routes/leaderRouter');
var Dishes = require('./models/dishes');

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
app.use('/dishes', dishRputer);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

var server = http.createServer(app);
server.listen(port, hostName, () => {
    console.log('Server is Running at https://' + hostName + ":" + port);
});