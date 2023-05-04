const Pregunta = require('../model/preguntas');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const getPregunta = async (req, res) => {
    try {
        const preguntas = await Pregunta.find({})
        res.status(200).send(preguntas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPreguntaEspecifica = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(206).send('Invalid question ID');
    }
      try {
        const preguntas = await Pregunta.findById(id);
        res.status(200).send(preguntas);
      } catch (error) {
        res.status(206).json({ error: error.message });
      }
    }

const crearPregunta = async (req, res) => {
    const { question, order, test, answer } = req.body;
    const preguntaExistente = await Pregunta.findOne({"question": question})
    if (preguntaExistente) {
        res.status(206).send(`Esta pregunta ya esta existe.`)
    } else {
    const nuevaPregunta = new Pregunta({
        question,
        order,
        test,
        answer
    })
    await nuevaPregunta.save()
    res.status(200).send(`Se creo la pregunta con éxito.`)
    }
}

const deletePregunta = async (req, res) => {
    const { id } = req.body
    if (id) {
        await Pregunta.findByIdAndDelete(id);
        res.status(200).send(`Se elimino la pregunta con éxito.`)
    } else{
        res.status(206).send(`No id.`)
    }

}

const patchPregunta = async (req, res) => {

    const { question, order, test, answer } = req.body

    await User.findByIdAndUpdate(id, {
        question,
        order,
        test,
        answer
    })

    res.status(200).send(`Se actualizo la pregunta con éxito.`)
};

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            if (password === user.password && user.role === 'admin') {
                const token = jwt.sign({ user }, claveToken, { expiresIn: "1h" })
                return res.status(200).json({ user, token })
            } else
            if (password === user.password) {
                const token = ''
                return res.status(200).json({ user, token })
            } else {
                return res.status(206).json({ message: "Datos incorrectos." })
            }
        } else {
            return res.status(206).json({ message: "Datos incorrectos." })
        }
    } catch (error) {
      console.error(error)
      return res.status(206).json({ message: "Ha ocurrido un error inesperado" })
    }
}

const restablecerContraseña = async (req, res) => {
    const { id, password  } = req.body
    await User.findByIdAndUpdate(id, {
        password
    })
    res.status(200).send(`Se actualizo su contraseña con éxito.`)
};

module.exports = { crearPregunta, getPregunta, deletePregunta, patchPregunta, getPreguntaEspecifica, loginUser, restablecerContraseña }