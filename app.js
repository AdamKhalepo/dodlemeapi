var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

var db = mongoose.connect("mongodb://localhost:27017/dodleme" , function(err,response) {
    if (err){console.log("Une erreur est survenue avec MongoDB");}
    else {console.log("Connexion a mongoDB : OK ! (" + db, " + ", response);}
});

app.use(bodyparser.json());

app.get('/', function(req, res) {
    res.send('Ca marche !');
})

app.listen(3000, function () {
    console.log("Server running...")
})