"use strict";

// routes/index.js
var express = require('express');

var router = express.Router(); // Rutas públicas

router.get('/', function (req, res) {
  res.render('index', {
    title: req.user != null ? "Bienvenido ".concat(req.user.nombre) : 'Convertidor de imagen ',
    user: req.user != null ? "".concat(req.user.nombre) : ''
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
