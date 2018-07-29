var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
var Promotions = require('../model/promotion');
var mongoose = require('mongoose');

promotionRouter.route('/')
    .get((req, res) => {
        Promotions.find({})
            .then((data) => {
                res.statusCode = 200,
                    res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch((err) => {
                console.log('Error GET ', err);
            })
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        console.log(req.body);
        Promotions.create(req.body)
            .then((promotion) => {
                console.log('Created Promotion : ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => {
                console.log('Error POST : ', err);
            })
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                console.log(resp);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => {
                console.log('Error DELETE ', err);
            })
    });



promotionRouter.route('/:promoId')
    .get((req, res) => {
        Promotions.findById(req.params.promoId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => {
                console.log("Error GET:/ : ", err);
            })
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific promotion with id : ' + req.params.promoId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
                new: true
            })
            .then((promotion) => {
                console.log(promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => {
                console.log('Error UPDATE://DISHID : ', err);
            })
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Deleting dish : ' + req.body.name);
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                console.log(resp);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => {
                console.log('Error DELETE ', err);
            })
    });




module.exports = promotionRouter;