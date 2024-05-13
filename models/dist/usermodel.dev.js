"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('../date_base/conexion'),
    obtenerConexion = _require.obtenerConexion;

function registrar(nombre, email, password) {
  var conexion;
  return regeneratorRuntime.async(function registrar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(obtenerConexion());

        case 2:
          conexion = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(conexion.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, password]));

        case 6:
          console.log('Usuario insertado correctamente');
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.error('Error al insertar usuario:', _context.t0);
          throw _context.t0;

        case 13:
          _context.prev = 13;
          // Liberar la conexión
          conexion.release();
          return _context.finish(13);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9, 13, 16]]);
}

function obtenerPorNombre(nombre) {
  var conexion, _ref, _ref2, results;

  return regeneratorRuntime.async(function obtenerPorNombre$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(obtenerConexion());

        case 2:
          conexion = _context2.sent;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(conexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]));

        case 6:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];
          return _context2.abrupt("return", results[0]);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          console.error('Error al obtener usuario por nombre:', _context2.t0);
          throw _context2.t0;

        case 16:
          _context2.prev = 16;
          // Liberar la conexión
          conexion.release();
          return _context2.finish(16);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 12, 16, 19]]);
}

function obtenerPorId(id) {
  var conexion, _ref3, _ref4, results;

  return regeneratorRuntime.async(function obtenerPorId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(obtenerConexion());

        case 2:
          conexion = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]));

        case 6:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          results = _ref4[0];
          return _context3.abrupt("return", results[0]);

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](3);
          console.error('Error al obtener usuario por ID:', _context3.t0);
          throw _context3.t0;

        case 16:
          _context3.prev = 16;
          // Liberar la conexión
          conexion.release();
          return _context3.finish(16);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 12, 16, 19]]);
}

module.exports = {
  registrar: registrar,
  obtenerPorNombre: obtenerPorNombre,
  obtenerPorId: obtenerPorId
};
//# sourceMappingURL=usermodel.dev.js.map
