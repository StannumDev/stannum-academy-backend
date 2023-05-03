const { Schema, model } = require('mongoose');

const user = new Schema({
    username: String,
    name: String,
    surname: String,
    email: String,  
    password: String,
    credits: Number,
    expire: String,
    expireUser: String,
    parent: String,
    role: String
})

module.exports = model (`User`, user)