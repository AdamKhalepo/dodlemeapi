var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
var mongoose = require("mongoose");
const User = require("./mongoose/User");
const {Event} = require("./mongoose/Event");
const {Creneau} = require("./mongoose/Event");

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

// GET USER BY USERNAME
app.get('/api/users/:username', async (req, res) => {
    const user = await User.findOne({username: req.params.username});
    res.send(user);
})

// MOSTLY FOR DEBUG GET ALL USERS
app.get('/api/users/', async (req, res) => {
    const user = await User.find({});
    res.send(user);
})

// DELETE ALL USERS
app.delete('/api/users', async (req, res) => {
    await User.deleteMany({});
    const users = await User.find({})
    res.send(users);

})

// DELETE USER BY USERNAME
app.delete('/api/users/:username', async (req, res) => {
    await User.deleteOne({username: req.params.username});
    const users = await User.find({})
    res.send(users);
})

// CREATE NEW USER
app.post('/api/users', function (req, res) {
    // Récup param
    let user_body = req.body;
    const user = new User({
        username:user_body.username,
        nom: user_body.nom,
        prenom:user_body.prenom});
    user.save(function(err, user) {
        if (err) {
            console.log(err);
            res.send(400, 'Bad Request');
        }
        res.status(201).json(user);
    });
})

// GET ALL EVENTS
app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.send(events);
})

// GET EVENTS CREATED BY USERNAME
app.get('/api/events/created/:username', async (req, res) => {
    const events = await Event.find({createur: req.params.username});
    res.send(events);
})

// GET EVENTS PARTICIPATED BY USERNAME
app.get('/api/events/participated/:username', async (req,res) => {
    const events = await Event.find({$or: [
            {"creneaux.participants.participants_OK":req.params.username},
            {"creneaux.participants.participants_NOT_OK":req.params.username}]});
    res.send(events);
})

// GET EVENTS WITH EVENT_ID
app.get('/api/event/:id', async (req, res) => {
    console.log(req.params.id)
    const events = await Event.findById(req.params.id);
    res.send(events);
})

// GET CRENEAU WITH CRENEAU_ID
app.get('/api/creneau/:id', async (req, res) => {
    console.log(req.params.id)
    const creneau = await Event.find({"creneaux._id": req.params.id}, {"creneaux.$": 1});
    res.send(creneau);
})

// DELETE ALL EVENTS
app.delete('/api/events', async (req, res) => {
    await Event.deleteMany({});
    const events = await Event.find();
    res.json(events)
})

// CREATE AN EVENT
app.post('/api/create', function(req, res) {
    // Récup param
    let event_body = req.body;
    const event = new Event({
        titre:event_body.titre,
        description: event_body.description,
        creneaux:event_body.creneaux,
        createur:event_body.createur,
        participants: [""],
        isClosed: false,
        creneauFinal: event_body.creneauFinal
    });
    event.save();
    res.status(201).json(event);
})

// ADD USER TO EVENT
app.patch('/api/events/:event_id/creneaux/:creneau_id',async function (req, res) {
    //Récup param
    let body = req.body;
    const creneau_id = req.params.creneau_id;

    if (body.estOK) { // OK POUR LE CRENEAU
        // push dans participants OK
        await Event.updateOne({"creneaux._id":creneau_id},
            {$push: {"creneaux.$.participants.participants_OK":body.username}});
        // enlever dans participants NOT OK
        await Event.updateOne({"creneaux._id":creneau_id},
            {$pull: {"creneaux.$.participants.participants_NOT_OK":body.username}});
    } else { // NOT OK POUR LE CRENEAU
        // pull dans participants OK
        await Event.updateOne({"creneaux._id":creneau_id},
            {$pull: {"creneaux.$.participants.participants_OK":body.username}});
        // push dans participants NOT OK
        await Event.updateOne({"creneaux._id":creneau_id},
            {$push: {"creneaux.$.participants.participants_NOT_OK":body.username}});
    }
    const events = await Event.find();
    res.json(events)
})

// ADD CRENEAU FINAL
app.patch('/api/events/:event_id/creneaufinal',async function (req, res) {
    //Récup param
    let body = req.body;
    console.log(body)
    await Event.updateOne({"creneaux._id":body._id},
        {"creneauFinal":body, "isClosed":true});
    const events = await Event.find();
    res.json(events)
})

//DELETE A SPECIFIC EVENT BY ITS ID
app.delete('/api/event/:event_id',async (req, res) => {
    const id_event = req.params.event_id;
    await Event.deleteOne({_id:id_event});
    const events = await Event.find();
    res.json(events)
})

app.listen(3000, function () {
    console.log("Server running...")
})