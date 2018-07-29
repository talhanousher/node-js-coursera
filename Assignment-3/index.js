var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate')
var config = require('./config');
var dishesRouter = require('./routes/dishRoutes');
var promotionRouter = require('./routes/promotionsRoute');
var leaderRouter = require('./routes/leaderRouter');
var users = require('./routes/user');
var url = 'mongodb://localhost:27017/test';
// var url = config.mongoUrl;

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
// app.use(cookieParser('12345-67890-09876-54321'));
// app.use(session({
//     name: 'session-id',
//     secret: '12345-67890-09876-54321',
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore(),
// }))

app.use(passport.initialize());
// app.use(passport.session());
app.use('/users', users)

// function auth(req, res, next) {
//     // console.log(req.signedCookies);
//     // console.log('req.session', req.session);

//     if (!req.user) {
//         var err = new Error('Not Authenticated');
//         err.status = 403;
//         return next(err);
//     } else {
//         // if (req.session.user === 'authenticated') {
//         //     next();
//         // } else {
//         //     var err = new Error('Not Authenticated');
//         //     err.status = 403;
//         //     return next(err);
//         // }
//         next();
//     }

// }
// app.use(auth);

app.use('/dishes', dishesRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

var server = http.createServer(app);
server.listen(port, hostName, () => {
    console.log('Server is Running at https://' + hostName + ":" + port);
});