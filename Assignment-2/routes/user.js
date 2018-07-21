var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../model/user');
var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ error: err });
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successfull' })
                })
            }
        })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Logged in Successfull' })
    // if (!req.session.user) {
    //     var authHeader = req.headers.authorization;
    //     if (!authHeader) {
    //         var err = new Error('Not Authenticated');
    //         res.setHeader('WWW-Authenticate', 'Basic');
    //         err.status = 401;
    //         return next(err);
    //     }

    //     var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    //     var username = auth[0];
    //     var password = auth[1];

    //     User.findOne({ username: username })
    //         .then((user) => {
    //             if (user === null) {
    //                 var err = new Error('User ' + username + ' does not exist!');
    //                 err.status = 403;
    //                 return next(err);
    //             }
    //             else if (user.password !== password) {
    //                 var err = new Error('Your password is incorrect!');
    //                 err.status = 403;
    //                 return next(err);
    //             }
    //             else if (user.username === username && user.password === password) {
    //                 req.session.user = 'authenticated';
    //                 res.statusCode = 200;
    //                 res.setHeader('Content-Type', 'text/plain');
    //                 res.end('You are authenticated!')
    //             }
    //         })
    //         .catch(err => next(err))
    // } else {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('You are already Authenticated');
    // }
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are Not logged In');
        res.statusCode = 403;
        next(err);
    }
})
module.exports = router;
