const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

//rutas especificas
const index = require('./index');
const registro = require('./registro');
const registrarUsuario = require('./registro-usuario');
const login = require('./login');
const logout = require('./logout');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/logout', logout);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);

module.exports = router;