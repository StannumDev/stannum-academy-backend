const { Schema, model } = require('mongoose');

const user = new Schema({
    name: String,
    email: String,  
    password: String,
    role: String
})

module.exports = model (`User`, user)