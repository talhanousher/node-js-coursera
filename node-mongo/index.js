var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/conFusion';
var dbName = 'conFusion';
mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connect To Db Successfully');
    var db = client.db(dbName);
    var collection = db.collection('dishes');
    collection.insertOne({ "name": "testdish1", "description": "testdescription" }, (err, result) => {
        assert.equal(err, null);
        console.log('After Insertion');
        console.log(result);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found');
            console.log(docs);
        });

        db.dropCollection('dishes', (err, result) => {
            assert.equal(err,null);
            client.close();
        })
    });
});
