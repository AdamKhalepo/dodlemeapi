const mongoose = require("mongoose");

const creneauSchema = new mongoose.Schema({
    date_debut: String,
    heure_debut: String,
    date_fin: String,
    heure_fin: String,
    participants: {
        participants_OK: [String],
        participants_NOT_OK: [String]
    }
});

const eventSchema = new mongoose.Schema({
    titre:String,
    description:String,
    creneaux: [creneauSchema],
    createur: String,
    participants: [String]
});

module.exports = {
    Event: mongoose.model("Event",eventSchema),
    Creneau: mongoose.model("Creneau", creneauSchema)
};
