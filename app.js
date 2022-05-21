var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var mongoose = require("mongoose");
const User = require("./mongoose/User");

var app = express();

/*
TEST AVEC MONGOOSE ET MONGODB

/* connection with mongoDB server */
var db = mongoose.connect("mongodb://localhost:27017/dodleme", function(err,response) {
    if (err){console.log(err);}
    else {console.log("Connexion a mongoDB : OK !")}
});

testMongoose();

async function testMongoose() {
    //Création de l'utilisateur Lionel
    const user = new User({username:"Lionel"});
    user.save().then(() => console.log("User lionel saved"));

    //Récupérer tous les users
    const getUsers = await User.find();
    console.log(getUsers);

    //Récupérer l'utilisateur Lionel
    const getUserLionel = await User.find({username:"Lionel"});
    console.log(getUserLionel);

    //Supprimer un utilisateur qui s'appelle Lionel
    //Si on veut en supprimer plusieurs Lionel utiliser User.deleteMany({username:"Lionel"})
    const deleteUserLionel = await User.deleteOne({username:"Lionel"});
    console.log(deleteUserLionel);
}

/* FIN TESTS AVEC MONGOOSE ET MONGODB */

app.use(bodyparser.json());
app.use(cors())

app.all('*', function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

let listeEvents = [];

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