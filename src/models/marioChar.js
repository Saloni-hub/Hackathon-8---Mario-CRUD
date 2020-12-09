const mongoose = require('mongoose');

//  Your code goes here
const marioScheme = new mongoose.Schema({
    name: String,
    weight: Number
})

const marioModel = mongoose.model('mariochar',marioScheme)
module.exports = marioModel;
