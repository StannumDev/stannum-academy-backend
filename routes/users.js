const express = require('express');
const route = express.Router();
const { crearUser, getUser, patchUser, deleteUser, getUserEspecifico, loginUser, restablecerContraseña } = require('../controllers/users');
const { jwtValidator } = require('../middleware/jwt')


route.get('/obtener-users', getUser);
route.get('/obtener-user/:id', getUserEspecifico);
route.post('/crear-user', crearUser)
route.patch(`/editar-user`, patchUser);
route.delete(`/eliminar-user`, deleteUser);
route.post(`/login-user`, loginUser);
route.patch(`/restablecer-password`, restablecerContraseña);

module.exports = route;