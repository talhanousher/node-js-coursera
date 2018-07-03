var express = require('express');
var bodyParser = require('body-parser');
var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the promotions');
    })
    .post((req, res) => {
        res.end('Will add the promotion : ' + req.body.name + ' with details ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the promotions!');
    });



promotionRouter.route('/:promoId')
    .all((req, res, next) => {
        console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send the Promo with id ' + req.params.promoId);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific promotion with id : ' + req.params.promoId);

    })
    .put((req, res, next) => {
        res.write('Will Update the promotions with id : ' + req.params.promoId + '\n');
        res.end("Update promotions : " + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting promotion : ' + req.body.name);
    });



module.exports = promotionRouter;