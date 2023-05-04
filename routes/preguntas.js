const express = require('express');
const route = express.Router();
const { crearPregunta, getPregunta, deletePregunta, patchPregunta, getPreguntaEspecifica, loginUser, restablecerContraseña } = require('../controllers/preguntas');
const { jwtValidator } = require('../middleware/jwt')


route.get('/obtener-pregunta', getPregunta);
route.get('/obtener-pregunta/:id', getPreguntaEspecifica);
route.post('/crear-pregunta', crearPregunta)
route.patch(`/editar-pregunta`, patchPregunta);
route.delete(`/eliminar-pregunta`, deletePregunta);
route.post(`/login-user`, loginUser);
route.patch(`/restablecer-contrasena`, restablecerContraseña);

module.exports = route;