const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registro = require('./registro');
 // Middleware para proteger rutas

const index = require('./index');

// Configura las rutas
router.use('/', index);
router.get('/login', loginController.mostrarLogin);
router.use('/registro', registro);

module.exports = router;