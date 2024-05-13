"use strict";

var usuarioModel = require('../models/usermodel');

var authMiddleWare = require('../middlewares/authMiddleware');

function registrarUsuario(req, res) {
  var _req$body, nombre, email, password, confirmPassword, usuarioExistente, hashedPassword;

  return regeneratorRuntime.async(function registrarUsuario$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, password = _req$body.password, confirmPassword = _req$body.confirmPassword;
          _context.prev = 1;

          if (!(password !== confirmPassword)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send('Las contraseñas no coinciden'));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(usuarioModel.obtenerPorNombre(nombre));

        case 6:
          usuarioExistente = _context.sent;

          if (!usuarioExistente) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).send('El usuario ya está registrado'));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(authMiddleWare.getHash(password));

        case 11:
          hashedPassword = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(usuarioModel.registrar(nombre, email, hashedPassword));

        case 14:
          // Usuario insertado correctamente
          res.redirect('/login');
          _context.next = 22;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.log("error en el registro");
          console.error(_context.t0.message);
          res.status(500).send('Error interno del servidor');

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
}

function obtenerUsuarioPorNombre(req, res) {
  var nombre, usuario;
  return regeneratorRuntime.async(function obtenerUsuarioPorNombre$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          nombre = req.params.nombre;
          _context2.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.obtenerPorNombre(nombre));

        case 4:
          usuario = _context2.sent;

          if (usuario) {
            res.json(usuario);
          } else {
            res.status(404).send('Usuario no encontrado');
          }

          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send('Error al obtener usuario por nombre');

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function obtenerUsuarioPorId(req, res) {
  var id, usuario;
  return regeneratorRuntime.async(function obtenerUsuarioPorId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(usuarioModel.obtenerPorId(id));

        case 4:
          usuario = _context3.sent;

          if (usuario) {
            res.json(usuario);
          } else {
            res.status(404).send('Usuario no encontrado');
          }

          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send('Error al obtener usuario por ID');

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = {
  registrarUsuario: registrarUsuario,
  obtenerUsuarioPorNombre: obtenerUsuarioPorNombre,
  obtenerUsuarioPorId: obtenerUsuarioPorId
};
//# sourceMappingURL=userController.dev.js.map
