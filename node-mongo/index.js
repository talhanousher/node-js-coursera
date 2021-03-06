var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/conFusion';
var dbName = 'conFusion';
var dbOperation = require('./dbOperations');
mongoClient.connect(url)
    .then((client) => {
        console.log('Connected Successfully to the Server');
        var db = client.db(dbName);
        dbOperation.insertDocument(db, { "name": "testpromisedish1", "description": "testpromisedescription1" }, 'dishes')
            .then((res) => {
                console.log('Insert Document : ', res.ops);
                return dbOperation.findDocuments(db, 'dishes');
            })
            .then((res) => {
                console.log('Found Document : ', res);
                return dbOperation.updateDocument(db, { "name": "testpromisedish1" }, { "description": "updatedtestpromisedescription" }, 'dishes');
            })
            .then((res) => {
                console.log('Updated Document ', res.result);
                return dbOperation.findDocuments(db, 'dishes');
            })
            .then((res) => {
                console.log('Found Updated Document : ', res);
                return db.dropCollection('dishes');
            })
            .then((res) => {
                console.log('Dropped Collection : ', res)
                return client.close();
            })
            .catch((err) => {
                console.log('Line 32', err)
            })
    })
    .catch((err) => {
        console.log('Line 37',err);
    })





// mongoClient.connect(url, (err, client) => {
//     assert.equal(err, null);
//     console.log('Connect To Db Successfully');
//     var db = client.db(dbName);
//     dbOperation.insertDocument(db, { "name": "testdish2", "description": "testdescription2" }, "dishes", (res) => {
//         console.log('Inserted : ', res.ops);
//         dbOperation.findDocuments(db, 'dishes', (res) => {
//             console.log('Found : ', res);
//             dbOperation.updateDocument(db, { "name": "testdish2" }, { "description": "updateddescription2" }, "dishes", (res) => {
//                 console.log("Updated", res.result);
//                 dbOperation.findDocuments(db, 'dishes', (res) => {
//                     console.log('Found Updated : ', res);
//                     db.dropCollection('dishes', (res)=>{
//                         console.log(res);
//                         client.close();
//                     } )
//                 })
//             })
//         })
//     });
//     // var collection = db.collection('dishes');
//     // collection.insertOne({ "name": "testdish1", "description": "testdescription" }, (err, result) => {
//     //     assert.equal(err, null);
//     //     console.log('After Insertion');
//     //     console.log(result);
//     //     collection.find({}).toArray((err, docs) => {
//     //         assert.equal(err, null);
//     //         console.log('Found');
//     //         console.log(docs);
//     //     });
//     //     db.dropCollection('dishes', (err, result) => {
//     //         assert.equal(err,null);
//     //         client.close();
//     //     })
//     // });
// });
