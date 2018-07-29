var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate')
var Dishes = require('../model/dishes')
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res) => {
        Dishes.find({})
            .populate('comments.author')
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch((err) => {
                console.log('Error GET ', err);
            })
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
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
                console.log('Error POST : ', err);
            })
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => {
                console.log("Error GET:/ : ", err);
            })
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific dish with id : ' + req.params.dishId);

    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // res.write('Will Update the dish with id : ' + req.params.dishId + '\n');
        // res.end("Update dish : " + req.body.name + ' with details ' + req.body.description);
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
                new: true
            })
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
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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


dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((data) => {
                if (data == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data.comments);
                }
            })
            .catch((err) => {
                console.log('Error GET ', err);
            })
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        // res.end('Will add the dish : ' + req.body.name + ' with details ' + req.body.description);
        console.log(req.body);
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    req.body.author = req.user._id;
                    dish.comments.push(req.body);
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => {
                            next(err);
                        })
                }
            })
            .catch((err) => {
                console.log('Error POST : ', err);
            })
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT not supported');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Deleting all the dishes!');
        Dishes.findById(req.params.dishId)
            .then((resp) => {
                if (resp == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    for (var i = 0; i < resp.comments.length; i++) {
                        resp.comments.id(resp.comments[i]._id).remove();
                    }
                    resp.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => {
                            next(err);
                        })
                }
            })
            .catch((err) => {
                console.log('Error DELETE ', err);
            })
    });



dishRouter.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
        // res.end('Will send the dish with id ' + req.params.dishId);
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    if (dish.comments.id(req.params.commentId) == null) {
                        err = new Error('Dish ' + req.params.dishId + ' Has No Comment Of id ' + req.params.commentId);
                        err.status = 404;
                        next(err);
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(dish.comments.id(req.params.commentId));
                    }
                }
            })
            .catch((err) => {
                console.log("Error GET:/DISHID  : ", err);
            })
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('Post Not supported on a specific dish with id : ' + req.params.dishId);

    })
    .put(authenticate.verifyUser, (req, res, next) => {
        // res.write('Will Update the dish with id : ' + req.params.dishId + '\n');
        // res.end("Update dish : " + req.body.name + ' with details ' + req.body.description);
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    if (dish.comments.id(req.params.commentId) == null) {
                        err = new Error('Dish ' + req.params.dishId + ' Has No Comment Of id ' + req.params.commentId);
                        err.status = 404;
                        next(err);
                    } else {
                        if (req.user._id.equals(dish.comments.id(req.params.commentId).author)) {
                            if (req.body.rating) {
                                dish.comments.id(req.params.commentId).rating = req.body.rating;
                            }
                            if (req.body.comment) {
                                dish.comments.id(req.params.commentId).comment = req.body.comment;
                            }
                            dish.save()
                                .then((dish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(dish);
                                })
                        } else {
                            err = new Error("You Are Not the Author of this comment");
                            err.statusCode = 403;
                            next(err);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log('Error UPDATE://DISHID : ', err);
            })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        // res.end('Deleting dish : ' + req.body.name);
        console.log(req.user);
        Dishes.findById(req.params.dishId)
            .then((resp) => {
                if (resp == null) {
                    err = new Error('Dish ' + req.params.dishId + ' Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    if (resp.comments.id(req.params.commentId) == null) {
                        err = new Error('Dish ' + req.params.dishId + ' Has No Comment Of id ' + req.params.commentId);
                        err.status = 404;
                        next(err);
                    } else {
                        console.log("req.user._id", req.user._id);
                        console.log("resp.comments.author", resp.comments.id(req.params.commentId).author);
                        if (req.user._id.equals(resp.comments.id(req.params.commentId).author)) {
                            resp.comments.id(req.params.commentId).remove();
                            resp.save()
                                .then((dish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(dish);
                                })
                        } else {
                            err = new Error("You Are Not the Author of this comment");
                            err.statusCode = 403;
                            next(err);
                        }
                    }
                }
            })

            .catch((err) => {
                console.log('Error DELETE ', err);
            })
    });



module.exports = dishRouter;