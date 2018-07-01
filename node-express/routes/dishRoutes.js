var express = require('express');
var bodyParser = require('body-parser');
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the dishes');
    })
    .post((req, res) => {
        res.end('Will add the dish : ' + req.body.name + ' with details ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the dishes!');
    });


module.exports = dishRouter;