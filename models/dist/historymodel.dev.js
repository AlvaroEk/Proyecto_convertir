"use strict";

var _require = require('../date_base/conexion'),
    obtenerConexion = _require.obtenerConexion; // Función para insertar un registro en la tabla historial_imagenes


function insertarRegistro(nombreOriginal, nombreConvertido, formatoDestino) {
  var conexion;
  return regeneratorRuntime.async(function insertarRegistro$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(obtenerConexion());

        case 3:
          conexion = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(conexion.query('INSERT INTO historial_imagenes (nombre_original, nombre_convertido, formato) VALUES (?, ?, ?)', [nombreOriginal, nombreConvertido, formatoDestino]));

        case 6:
          console.log('Registro insertado correctamente');
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error al insertar registro en historial_imagenes:', _context.t0);
          throw _context.t0;

        case 13:
          _context.prev = 13;

          // Liberar la conexión si se estableció correctamente
          if (conexion) {
            conexion.release();
          }

          return _context.finish(13);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9, 13, 16]]);
}

module.exports = {
  insertarRegistro: insertarRegistro
};
//# sourceMappingURL=historymodel.dev.js.map
