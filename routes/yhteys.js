var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ravintolajoku';


MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err != null) {
        console.error("Virhe yhteyden avaamisessa!" + err.message);
        throw err;
    }

    const dbo = db.db();
    console.log("Yhteys Mongoon saatu");
    const kokoelma = dbo.collection('ravintolajoku');

    router.route('/')
        .get(function (req, res) {
            kokoelma.find({borough: req.query.borough, cuisine: req.query.cuisine}).limit(10).toArray().then((result) => {
                console.log(res);
                res.json(result);
                // db.close();
            }).catch(function(err) {
                console.log(err.stack);
            });
        });

    //kokoelma.find({}).limit(5).toArray()
    // kokoelma.updateMany({cuisine: 'Chinese'}, {$set: {cuisine: 'Kiinalaista'}})
    // kokoelma.insertOne({tieto: 'arvo', toinen: 'luvattu arvo'})
    // kokoelma.updateOne({borough: 'Bronx', name: 'Wild Asia'},
    //         {$push: {grades: arvio}})
    //    TODO: VIRHEKÄSITTELY KUNTOON?
    //  .then((res) => {
    //      console.log(res);
    //    console.log(res);
    //  db.close();
    //});
});

module.exports = router;