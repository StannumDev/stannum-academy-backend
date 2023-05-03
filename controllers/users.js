const User = require('../model/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const axios = require('axios');
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

const getUserPatrocinado = async (req, res) => {
    const { username } = req.body;
    try {
        const users = await User.find({ parent: username });
        res.status(200).send(users);
    } catch (error) {
        res.status(206).json('No hay usuarios');
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
    const { username, name, surname, email, password, role } = req.body;
    const userExistentes = await User.findOne({"username": username})
    const userExistentesEmail = await User.findOne({"email": email})
    if (userExistentes) {
        res.status(206).send(`Este usuario ya existe.`)
    } else if (userExistentesEmail){
        res.status(206).send(`Este correo electrónico ya esta en uso.`)
    } else {
    const credits = 0;
    const parent = 'xplay';
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const expireUser = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const nuevoUser = new User({
        username,
        name,
        surname,
        email,
        password,
        credits,
        expire: expire.toLocaleDateString('es-ES'),
        expireUser: expireUser.toLocaleDateString('es-ES'),
        parent,
        role
    })
    await nuevoUser.save()
    res.status(200).send(`Se creo el usuario con éxito.`)
    }
}

const crearUserPatrocinado = async (req, res) => {
    const { username, name, surname, email, password, parent } = req.body;
    const userExistentes = await User.findOne({"username": username})
    const userExistentesEmail = await User.findOne({"email": email})
    if (userExistentes) {
        res.status(206).send(`Este usuario ya existe.`)
    } else if (userExistentesEmail){
        res.status(206).send(`Este correo electrónico ya esta en uso.`)
    } else {
    const role = 'usuario';
    const credits = 0;
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const expireUser = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const nuevoUser = new User({
        username,
        name,
        surname,
        email,
        password,
        credits,
        expire: expire.toLocaleDateString('es-ES'),
        expireUser: expireUser.toLocaleDateString('es-ES'),
        parent,
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
        res.status(500).send(`No id.`)
    }

}

const renewUser = async (req, res) => {
    const { id, expireUser } = req.body;
    const [day, month, year] = expireUser.split('/');
    const NewExpire = new Date(year, month - 1, day);
    NewExpire.setMonth(NewExpire.getMonth() + 1);
    await User.findByIdAndUpdate(id, {
      expireUser: NewExpire.toLocaleDateString('es-ES')
    });
    res.status(200).send('Se actualizó la suscripción con éxito.');
  };

const takeCredit = async (req, res) => {
    const { id, credits } = req.body
    await User.findByIdAndUpdate(id, {
        credits,
    })
    res.status(200).send(`Se resto el crédito con éxito.`)
};

const removeCredits = async (id) => {
    const credits = 0;
    await User.findByIdAndUpdate(id, {
        credits,
    })
};

const addCredits = async (req, res) => {
    const { id, credits } = req.body
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    await User.findByIdAndUpdate(id, {
        credits,
        expire: expire.toLocaleDateString('es-ES')
    })
    res.status(200).send(`Se actualizaron los créditos con éxito.`)
};

const recuperarCredits = async (req, res) => {
    const { id, credits } = req.body
    await User.findByIdAndUpdate(id, {
        credits,
    })
    res.status(200).send(`Se actualizaron los créditos con éxito.`)
};

const patchUser = async (req, res) => {
    const { id, name, surname, password, role } = req.body
    await User.findByIdAndUpdate(id, {
        name,
        surname,
        password,
        role
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const patchUserGold = async (req, res) => {
    const { id, name, surname, password } = req.body
    await User.findByIdAndUpdate(id, {
        name,
        surname,
        password
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const rolUser = async (req, res) => {
    const { id, role  } = req.body
    await User.findByIdAndUpdate(id, {
        role
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
          const currentDate = new Date()
          const expireDateParts = user.expire.split('/')
          const expireDate = new Date(expireDateParts[2], expireDateParts[1] - 1, expireDateParts[0])
          if (expireDate.setHours(23, 59, 59, 999) < currentDate.setHours(23, 59, 59, 999)) {
            return res.status(206).json({ message: "Tu suscripción ha caducado." })
        } else if (password === user.password) {
          const token = jwt.sign({ user }, claveToken, { expiresIn: "1h" })
          return res.status(200).json({ user, token })
        } else {
          return res.status(206).json({ message: "Datos incorrectos." })
        }
      } else {
        return res.status(206).json({ message: "Datos incorrectos." })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Ha ocurrido un error inesperado" })
    }
  }

const emailUser = async (req, res) => {
    const { email } = req.body

    try{
        const user = await User.findOne({"email": email})
        if (user) {
            if (user.role === 'admin' || user.role === 'gold') {
              res.status(206).send({ message: 'Usuario no encontrado' })
            } else {
              res.status(200).send(user)
            }
          } else {
            res.status(206).send({ message: 'Usuario no encontrado' })
          }
    }
    catch(error){
        console.error(error);
    }
};

const restablecerContraseña = async (req, res) => {
    const { id, password  } = req.body
    await User.findByIdAndUpdate(id, {
        password
    })
    res.status(200).send(`Se actualizo su contraseña con éxito.`)
};

const checkUsers = async () => {
    const users = await User.find({})
    const now = new Date();
    for (const user of users) {
      const expireDate = new Date(user.expire.split('/').reverse().join('-'));
      if (now > expireDate) {
        await removeCredits(user.id);
      }
    }
  };

  setInterval(() => {
    checkUsers();
  }, 20 * 60 * 1000);

module.exports = { crearUser, getUser, deleteUser, patchUser, getUserEspecifico, rolUser, loginUser, emailUser, restablecerContraseña, takeCredit, addCredits, crearUserPatrocinado, getUserPatrocinado, recuperarCredits, patchUserGold, renewUser }