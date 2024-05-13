"use strict";

var express = require('express');

var router = express.Router();
router.get('/', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(req.logout(function _callee(err) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (err) {
                      // Manejo del error
                      console.error(err);
                    }

                    _context.next = 3;
                    return regeneratorRuntime.awrap(req.session.destroy(function (err) {
                      // Eliminar la sesión completa
                      if (err) {
                        console.error('Error al destruir la sesión:', err);
                        return res.status(500).send('Error al cerrar sesión');
                      }

                      console.log('req.session.destroy finalizado correctamente');
                    }));

                  case 3:
                    _context.next = 5;
                    return regeneratorRuntime.awrap(req.sessionStore.clear(function (err) {
                      if (err) {
                        console.error('Error al limpiar el almacén de sesiones:', err);
                        return res.status(500).send('Error al cerrar sesión');
                      }

                      console.log('req.sessionStore.clear finalizado correctamente');
                    }));

                  case 5:
                    carritoCache = {};
                    res.clearCookie('token');
                    res.redirect('/'); // Redirigir a la página principal

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error('Error al cerrar sesión:', _context2.t0);
          res.status(500).send('Error al cerrar sesión');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
});
module.exports = router;
//# sourceMappingURL=logout.dev.js.map
