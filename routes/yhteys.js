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

            kokoelma.find({borough: new RegExp(req.query.borough,"i"), cuisine: new RegExp(req.query.cuisine,"i")}).limit(10).toArray().then((result) => {

                console.log(res);
                res.json(result);
                // db.close();
            }).catch(function(err) {
                console.log(err.stack);
            });
        })
        .post((req, res) => {
            kokoelma.save(req.body, (err, result) => {
                if (err) return console.log(err);
                console.log('saved to database');
                res.redirect('/')
            })
        })
        .put((req, res) => {
            kokoelma.findOneAndUpdate({borough: req.body.borough}, {
                $set: {
                    name: req.body.name,
                    borough: req.body.borough
                }
            }, {
                //sort: {_id: -1},
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err)
                res.json(result)
            })
        })
        .delete((req, res) => {
            kokoelma.findOneAndDelete({name: req.body.name},
                (err, result) => {
                    if (err) return res.send(500, err);
                    res.send({message: 'Object deleted! Hope you aint gonna miss it..'})
                })
        });

    router.route("/hae")
        .get((req, res) => {

            kokoelma.find({borough: req.body.borough}).limit(25).toArray().then((result) => {
                console.log(res);
                res.json(result);
            })
        })
        .get((req, res) => {
            kokoelma.find({cuisine: new RegExp(req.body.cuisine,"i")}).limit(25).toArray().then((result) => {

                console.log(res);
                res.json(result);
            })
        })



});

module.exports = router;