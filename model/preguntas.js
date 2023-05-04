const { Schema, model } = require('mongoose');

const pregunta = new Schema({
    question: String,
    order: String,  
    test: String,
    answer: Array
})

module.exports = model (`Pregunta`, pregunta)