"use strict";

var connection = require('../date_base/conexion');

function insertarRegistro(nombreOriginal, nombreConvertido, formatoDestino, idUsuario) {
  return regeneratorRuntime.async(function insertarRegistro$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            connection.query('INSERT INTO historial_imagenes (nombre_original, nombre_convertido, formato, id_usuario) VALUES (?, ?, ?, ?)', [nombreOriginal, nombreConvertido, formatoDestino, idUsuario], function (error, results) {
              if (error) {
                console.error('Error al guardar en la base de datos:', error);
                reject(error);
              } else {
                resolve(results);
              }
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  insertarRegistro: insertarRegistro
};
//# sourceMappingURL=history.dev.js.map
