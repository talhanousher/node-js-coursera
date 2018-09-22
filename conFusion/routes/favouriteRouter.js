var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favourite = require('../models/favourites');
var authenticate = require('../authenticate');
var favouriteRouter = express.Router();
var cors = require('./cors');
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorite) => {
                console.log(favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => {
                next(err);
            })
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then((favourite) => {
                console.log(favourite);
                if (favourite === null) {
                    let dishes = [];
                    for (dish of req.body) {
                        dishes.push(dish._id);
                    }
                    Favourite.create({ "user": req.user._id, "dishes": dishes })
                        .then((favourite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favourite);
                        }, (err) => {
                            next(err);
                        })
                        .catch((err) => {
                            next(err);
                        })
                } else {
                    console.log(favourite);
                    for (dish of req.body) {
                        if (favourite.dishes.indexOf(dish._id) == -1) {
                            favourite.dishes.push(dish._id);
                        }
                    }
                    favourite.save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite)
                        }, (err) => next(err))
                        .catch((err) => {
                            next(err);
                        })
                }
            }, (err) => {
                console.log(err);
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favourite.remove({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

favouriteRouter.route('/:dishId')
    .post(authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then((favourite) => {
                if (favourite == null) {
                    let dishes = [];
                    dishes.push(req.params.disheId);
                    Favourite.create({
                        "user": req.user._id,
                        "dishes": dishes
                    })
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                        .catch((err) => next(err))
                } else {
                    if (favourite.dishes.indexOf(req.params.dishId) == -1) {
                        favourite.dishes.push(req.params.dishId);
                        favourite.save()
                            .then((favorite) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite)
                            }, (err) => next(err))
                    } else {
                        err = new Error("Dish Already Exist");
                        err.status = 400;
                        next(err);
                    }
                }

            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite !== null) {
                    favorite.dishes.splice(favorite.dishes.indexOf(req.params.dishId), 1);
                    favorite.save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite)
                        }, (err) => next(err))
                } else {
                    err = new Error('Dish not found');
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })

module.exports = favouriteRouter;