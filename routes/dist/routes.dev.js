"use strict";

var express = require('express');

var router = express.Router();

var authMiddleware = require('../middlewares/authMiddleware'); //rutas especificas


var registro = require('./registro');

var registrarUsuario = require('./registro-usuario');

var login = require('./login'); // Middleware para proteger rutas


var index = require('./index'); // Configura las rutas


router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
