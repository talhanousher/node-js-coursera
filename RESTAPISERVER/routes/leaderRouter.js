var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the Leaders');
    })
    .post((req, res) => {
        res.end('Will add the leader : ' + req.body.name + ' with details ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the Leaders!');
    });



leaderRouter.route('/:leadersId')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send the Leader with id ' + req.params.leadersId);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific leader with id : ' + req.params.leadersId);

    })
    .put((req, res, next) => {
        res.write('Will Update the leader with id : ' + req.params.leadersId + '\n');
        res.end("Update leader : " + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting leader : ' + req.body.name);
    });



module.exports = leaderRouter;