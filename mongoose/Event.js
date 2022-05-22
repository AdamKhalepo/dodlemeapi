const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    titre:String,
    description:String,
    creneaux: [{
        date_debut: String,
        heure_debut: String,
        date_fin: String,
        heure_fin: String
    }],
    createur: String
});

module.exports = mongoose.model("Event",eventSchema);
