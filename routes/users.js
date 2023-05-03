const express = require('express');
const route = express.Router();
const { crearUser, getUser, patchUser, deleteUser, getUserEspecifico, rolUser, loginUser, emailUser, restablecerContraseña, takeCredit, addCredits, crearUserPatrocinado, getUserPatrocinado, recuperarCredits, patchUserGold, renewUser } = require('../controllers/users');
const { jwtValidator } = require('../middleware/jwt')


route.get('/obtener-users', getUser);
route.post(`/obtener-users-patrocinado`, getUserPatrocinado);
route.get('/:id', getUserEspecifico);
route.post('/crear-user', crearUser)
route.patch(`/editar-user`, patchUser);
route.patch(`/editar-user-gold`, patchUserGold);
route.patch(`/estado-user`, rolUser);
route.delete(`/eliminar-user`, deleteUser);
route.patch(`/agregar-creditos`, addCredits);
route.patch(`/recuperar-creditos`, recuperarCredits);
route.patch(`/restar-credito`, takeCredit);
route.patch(`/renovar-user-suscripcion`, renewUser);
route.post(`/login-user`, loginUser);
route.patch(`/restablecer-password`, restablecerContraseña);
route.post(`/restablecer-email`, emailUser);
route.post(`/crear-user-patrocinado`, crearUserPatrocinado);

module.exports = route;