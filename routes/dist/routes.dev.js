"use strict";

var express = require('express');

var router = express.Router();

var authMiddleware = require('../middlewares/authMiddleware'); //rutas especificas


var index = require('./index');

var registro = require('./registro');

var registrarUsuario = require('./registro-usuario');

var login = require('./login');

var logout = require('./logout'); // Configura las rutas


router.use('/', index);
router.use('/login', login);
router.use('/logout', logout);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
