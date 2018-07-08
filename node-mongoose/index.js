// var mongoose = require('mongoose');
// var Dishes = require('./models/dishes');
// var url = 'mongodb://localhost:27017/conFusion';
// var connect = mongoose.connect(url);

// connect.then((db) => {
//     console.log('Connection Successfully to the Database : ', db);
//     var newDish = Dishes({
//         name: 'testMongooseDish1',
//         description: 'testMongooseDescription1'
//     });

//     newDish.save()
//         .then((res) => {
//             console.log("Response : ", res);
//             return Dishes.find({}).exec();
//         })
//         .then((res) => {
//             console.log('Found Dishes : ', res);
//             return Dishes.remove({});
//         })
//         .then((res) => {
//             console.log('Deleted Dishes : ', res);
//             return mongoose.connection.close();
//         })
//         .catch((err) => {
//             console.log('Error : ', err)
//         })
// })


//Some Modifications
var mongoose = require('mongoose');
var Dishes = require('./models/dishes');
var url = 'mongodb://localhost:27017/conFusion';
var connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connection Successfully to the Database : ', db);
    Dishes.create({
        name: 'testMongooseDish11121',
        description: 'testMongooseDescription1'
    })
        .then((res) => {
            console.log("Response : ", res);
            return Dishes.findByIdAndUpdate(res._id, {
                $set: { description: 'Updated' },
            }, {
                    new: true,
                }).exec();
        })
        .then((res) => {
            console.log('Found Dishes : ', res);
            res.comment.push({
                ratings: 5,
                comment:'HEllo Heelooo',
                author:'Talha'
            })
            return res.save();
            // return Dishes.remove({});
        })
        .then((res) => {
            console.log('Saved Dishes : ', res);
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log('Error : ', err)
        })
})
