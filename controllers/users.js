const User = require('../model/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');
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

const deleteUser = async (req, res) => {
    const { id } = req.body
    if (id) {
        await User.findByIdAndDelete(id);
        res.status(200).send(`Se elimino el usuario con éxito.`)
    } else{
        res.status(206).send(`No id.`)
    }

}

const crearUser = async (req, res) => {

    const { email } = req.body;
  
    const userExistentesEmail = await User.findOne({ email });
    if (userExistentesEmail) {
        res.status(206).send('Este email ya está en uso.');
    } else {
        const password = generateRandomPassword();
        const role = 'member';
        const status = 'active';        
        const startDate = moment().format('DD/MM/YYYY');
        const totalScore = 0;
        const welcomeViewed = true;
        const questionnaire1StartEnabled = true;
        const questionnaire1FinalEnabled = false;
    
        const nuevoUser = new User({
            email,
            password,
            role,
            startDate,
            totalScore,
            welcomeViewed,
            status,
            questionnaire1StartEnabled,
            questionnaire1FinalEnabled,
            dominioDirectivoTestInicial: getGenericInitialValueForSection(),
            dominioDirectivoTestFinal: getGenericInitialValueForSection(),
        });
    
        await nuevoUser.save();
        res.status(200).json(nuevoUser).send('Se creó el usuario con éxito.');
    }
};

const generateRandomPassword = () =>{

    const length = 10;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
  
    return password;
}

const getGenericInitialValueForSection = () => {

    return {
        question1: undefined,
        question1Justification: undefined,
        question2: undefined,
        question2Justification: undefined,
        question3: undefined,
        question3Justification: undefined,
        question4: undefined,
        question4Justification: undefined,
        question5: undefined,
        question5Justification: undefined,
        question6: undefined,
        question6Justification: undefined,
        question7: undefined,
        question8: undefined,
        question9: undefined,
        question10: undefined,
        question11: undefined,
        question12: undefined,
        question13: undefined,
        question14: undefined,
        question14Justification: undefined,
        question15: undefined,
        question15Justification: undefined,
        sectionScore: undefined,
    };
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