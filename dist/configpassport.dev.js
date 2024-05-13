"use strict";

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var _require = require('./middlewares/authMiddleware'),
    comparePassword = _require.comparePassword;

var UserModel = require('./models/usermodel');

var usuarios = UserModel;
passport.use(new LocalStrategy(function _callee(nombre, contraseña, done) {
  var user, passwordMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(usuarios.obtenerPorNombre(nombre));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: 'Usuario incorrecto.'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(authMiddleware.comparePassword(contraseña, user.contraseña));

        case 8:
          passwordMatch = _context.sent;

          if (passwordMatch) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: 'Contraseña incorrecta.'
          }));

        case 11:
          return _context.abrupt("return", done(null, user));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", done(_context.t0));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function _callee2(id, done) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(usuarios.obtenerPorId(id).then(function (user) {
            done(null, user);
          })["catch"](function (error) {
            done(error, null);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = passport;
//# sourceMappingURL=configpassport.dev.js.map
