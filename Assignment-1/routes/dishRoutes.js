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



dishRouter.route('/:dishId')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send the dish with id ' + req.params.dishId);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific dish with id : ' + req.params.dishId);

    })
    .put((req, res, next) => {
        res.write('Will Update the dish with id : ' + req.params.dishId + '\n');
        res.end("Update dish : " + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting dish : ' + req.body.name);
    });



module.exports = dishRouter;