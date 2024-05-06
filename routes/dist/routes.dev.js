"use strict";

var express = require('express');

var router = express.Router(); // Middleware para proteger rutas

var index = require('./index'); // Configura las rutas


router.use('/', index);
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
