const User = require('../model/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const claveToken = process.env.CLAVE;

const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserEspecifico = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(206).send('Invalid user ID');
    }
      try {
        const user = await User.findById(id);
        res.status(200).send(user);
      } catch (error) {
        res.status(206).json({ error: error.message });
      }
    }

const crearUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExistentesEmail = await User.findOne({"email": email})
    if (userExistentesEmail) {
        res.status(206).send(`Este email ya esta en uso.`)
    } else {
    const role = 'usuario'
    const nuevoUser = new User({
        name,
        email,
        password,
        role
    })
    await nuevoUser.save()
    res.status(200).send(`Se creo el usuario con éxito.`)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    if (id) {
        await User.findByIdAndDelete(id);
        res.status(200).send(`Se elimino el usuario con éxito.`)
    } else{
        res.status(206).send(`No id.`)
    }

}

const patchUser = async (req, res) => {

    const { name, email, password } = req.body

    await User.findByIdAndUpdate(id, {
        name,
        surname,
        password
    })

    res.status(200).send(`Se actualizo el usuario con éxito.`)
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

module.exports = { crearUser, getUser, deleteUser, patchUser, getUserEspecifico, loginUser, restablecerContraseña }