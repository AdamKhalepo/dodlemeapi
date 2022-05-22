const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String,unique:true},
    nom: String,
    prenom:String
});

module.exports = mongoose.model("User",userSchema);
