"use strict";

// routes/registrar-usuario.js
var express = require('express');

var router = express.Router();

var db = require('../db'); // Ruta para manejar el registro de usuarios


router.post('/', function (req, res) {
  var _req$body = req.body,
      nombre = _req$body.nombre,
      email = _req$body.email,
      password = _req$body.password,
      confirmPassword = _req$body.confirmPassword; // Verificar si la contraseña y su confirmación coinciden

  if (password !== confirmPassword) {
    return res.status(400).send('Las contraseñas no coinciden');
  } // Verificar si el usuario ya está registrado


  db.obtenerUsuarioPorNombre(nombre, function (err, usuarioExistente) {
    if (err) {
      return res.status(500).send('Error interno del servidor');
    }

    if (usuarioExistente) {
      return res.status(400).send('El usuario ya está registrado');
    }

    db.registrarUsuario(nombre, email, password).then(function () {
      // Usuario insertado correctamente
      res.redirect('/login');
    })["catch"](function (err) {
      // Error al insertar usuario
      return res.status(500).send('Error interno del servidor');
    });
  });
});
module.exports = router;
//# sourceMappingURL=registro-usuario.dev.js.map
