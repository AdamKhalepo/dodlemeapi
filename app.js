var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var mongoose = require("mongoose");
const User = require("./mongoose/User");
const Event = require("./mongoose/Event");

var app = express();

/* connection with mongoDB server */
var db = mongoose.connect("mongodb://localhost:27017/dodleme", function(err,response) {
    if (err){console.log(err);}
    else {console.log("Connexion a mongoDB : OK !")}
});

app.use(bodyparser.json());
app.use(cors())

app.all('*', function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.send(events);
})

app.delete('/api/events', async (req, res) => {
    const events = await Event.deleteMany({});
    res.send("Suppression de tous les events OK");
})

app.post('/api/create', function(req, res) {
    // Récup param
    let event_body = req.body;
    const event = new Event({
        titre:event_body.titre,
        description: event_body.description,
        creneaux:event_body.creneaux});

    event.save();
    res.status(201).json(event);
})

app.listen(3000, function () {
    console.log("Server running...")
})