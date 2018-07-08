var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes')
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res) => {
        Dishes.find({})
            .then((data) => {
                res.statusCode = 200,
                    res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch((err) => {
                console.log('Error GET ', err);
            })
    })
    .post((req, res) => {
        // res.end('Will add the dish : ' + req.body.name + ' with details ' + req.body.description);
        console.log(req.body);
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Created Dish : ', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => {
                console.log('Error POST : ' , err);
            })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete((req, res, next) => {
        // res.end('Deleting all the dishes!');
        Dishes.remove({})
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



dishRouter.route('/:dishId')
    .get((req, res) => {
        // res.end('Will send the dish with id ' + req.params.dishId);
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => {
                console.log("Error GET:/DISHID  : ", err);
            })
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific dish with id : ' + req.params.dishId);

    })
    .put((req, res, next) => {
        // res.write('Will Update the dish with id : ' + req.params.dishId + '\n');
        // res.end("Update dish : " + req.body.name + ' with details ' + req.body.description);
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
                new: true  })
            .then((dish) => {
                console.log(dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => {
                console.log('Error UPDATE://DISHID : ', err);
            })
    })
    .delete((req, res, next) => {
        // res.end('Deleting dish : ' + req.body.name);
        Dishes.findByIdAndRemove(req.params.dishId)
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



module.exports = dishRouter;