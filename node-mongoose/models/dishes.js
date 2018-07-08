var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = Schema({
    ratings: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {
        timestamps: true,
    });



var dishSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    comment: [commentSchema],

},
    {
        timestamps: true,
    });


var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;