"use strict";

var express = require('express');

var router = express.Router();

var usuarioController = require('../controllers/userController');

router.post('/', usuarioController.registrarUsuario);
module.exports = router;
//# sourceMappingURL=registro-usuario.dev.js.map
