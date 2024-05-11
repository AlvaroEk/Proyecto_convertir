"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var authMiddleware = require('../middlewares/authMiddleware.js'); // Ruta para mostrar el formulario de login


router.get('/', function (req, res) {
  res.render('login', {
    title: 'Iniciar sesión'
  });
});
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  // Si se autentica correctamente, crea un token JWT
  var token = authMiddleware.generateToken(req.user.id);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true
  });
  res.redirect('/');
});
module.exports = router;
//# sourceMappingURL=login.dev.js.map
