"use strict";

// routes/registro.js
var express = require('express');

var router = express.Router(); // Ruta para mostrar el formulario de registro

router.get('/', function (req, res) {
  res.render('registro', {
    title: 'Registro'
  });
});
module.exports = router;
//# sourceMappingURL=registro.dev.js.map
