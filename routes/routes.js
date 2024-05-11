const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

//rutas especificas
const registro = require('./registro');
const registrarUsuario = require('./registro-usuario');
const login = require('./login');

 // Middleware para proteger rutas
const index = require('./index');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);

module.exports = router;