var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require("mongoose");
var cors = require('cors')

var app = express();

var db = mongoose.connect("mongodb://localhost:27017/dodleme" , function(err,response) {
    if (err){console.log("Une erreur est survenue avec MongoDB");}
    else {console.log("Connexion a mongoDB : OK ! (" + db, " + ", response);}
});

app.use(bodyparser.json());
app.use(cors())

app.all('*', function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

let listeEvents = []

app.get('/api/events', function(req, res) {
    res.status(200).json(listeEvents);
})

app.post('/api/create', function(req,
                                    res) {
    // Récup param
    let event = req.body;
    listeEvents.push(event)
    res.status(201).json(event);
})

app.listen(3000, function () {
    console.log("Server running...")
})