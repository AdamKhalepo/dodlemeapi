var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

var db = mongoose.connect("mongodb://localhost:27017/dodleme" , function(err,response) {
    if (err){console.log("Une erreur est survenue avec MongoDB");}
    else {console.log("Connexion a mongoDB : OK ! (" + db, " + ", response);}
});

app.use(bodyparser.json());

app.all('*', function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

// REMOVE COMMENT TO TEST
/*function Evenement(titre, description) {
    this.titre = titre;
    this.description = description;
}

var liste = [];
*/



app.get('/api/events', function(req, res) {
    // REMOVE COMMENT TO TEST
    /*let e = new Evenement("Test", "rhezqhrjq");
    liste.push(e);
    res.status(200).json(liste);*/
})

app.listen(3000, function () {
    console.log("Server running...")
})