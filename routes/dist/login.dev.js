"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas
// Ruta para mostrar el formulario de login


router.get('/', function (req, res) {
  res.render('login', {
    title: 'Iniciar sesión',
    user: req.user != null ? "".concat(req.user.nombre) : ''
  });
});
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function _callee(req, res) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Si se autentica correctamente, crea un token JWT
          token = authMiddleware.generateToken(req.user.id);
          res.cookie('token', token, {
            httpOnly: true,
            secure: false
          });
          console.log("se autentifico correctamente el token jwt", token);
          res.redirect('/');

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=login.dev.js.map
