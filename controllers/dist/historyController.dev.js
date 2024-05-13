"use strict";

var _require = require('../models/historymodel'),
    insertarRegistro = _require.insertarRegistro;

exports.convertirImagen = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {} catch (error) {
            console.error('Error al convertir la imagen:', error);
            res.status(500).send('Error interno del servidor');
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
//# sourceMappingURL=historyController.dev.js.map
