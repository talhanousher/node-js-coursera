var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishRputer = require('./routes/dishRoutes');
var promotionRouter = require('./routes/promotionsRoute');
var leaderRouter = require('./routes/leaderRouter');

var port = 3000;
var hostName = 'localhost';
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes', dishRputer);
app.use('/promotions', promotionRouter);
app.use('/leaders',leaderRouter);

var server = http.createServer(app);
server.listen(port, hostName, () => {
    console.log('Server is Running at https://' + hostName + ":" + port);
});