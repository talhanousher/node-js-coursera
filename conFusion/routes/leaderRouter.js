var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
var Leaders = require('../models/leader');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
var cors = require('./cors');
leaderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res) => {
        Leaders.find({})
            .then((data) => {
                res.statusCode = 200,
                    res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch((err) => {
                console.log('Error GET ', err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        console.log(req.body);
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Created Leaders : ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => {
                console.log('Error POST : ', err);
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
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


leaderRouter.route('/:leadersId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res) => {
        Leaders.findById(req.params.leadersId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => {
                console.log("Error GET:/ : ", err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific promotion with id : ' + req.params.leadersId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leadersId, {
            $set: req.body
        }, {
                new: true
            })
            .then((leader) => {
                console.log(leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => {
                console.log('Error UPDATE://DISHID : ', err);
            })
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Deleting dish : ' + req.body.name);
        Leaders.findByIdAndRemove(req.params.leadersId)
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



module.exports = leaderRouter;