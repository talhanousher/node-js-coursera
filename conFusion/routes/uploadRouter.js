var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

var imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)/)) {
        return callback(new Error("only upload an image"), false);
    }
    callback(null, true);
}

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});
var uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET Opertaion not supported on /image');
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Opertaion not supported on /image');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE Opertaion not supported on /image');
    })
module.exports = uploadRouter;