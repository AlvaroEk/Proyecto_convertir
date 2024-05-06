"use strict";

var sharp = require('sharp');

var path = require('path');

exports.convertirImagen = function _callee(rutaImagenOriginal, formato) {
  var nombreArchivoConvertido, rutaImagenConvertida;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('Ruta de la imagen original:', rutaImagenOriginal);
          console.log('Formato:', formato);
          nombreArchivoConvertido = "convertida_".concat(Date.now(), ".").concat(formato.toLowerCase());
          rutaImagenConvertida = path.join(__dirname, "../public/converted/".concat(nombreArchivoConvertido)); // Utiliza Sharp u otra biblioteca para convertir la imagen

          _context.next = 7;
          return regeneratorRuntime.awrap(sharp(rutaImagenOriginal).toFormat(formato.toLowerCase()).toFile(rutaImagenConvertida));

        case 7:
          console.log('Imagen convertida con éxito a:', rutaImagenConvertida);
          return _context.abrupt("return", rutaImagenConvertida);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error al convertir la imagen:', _context.t0);
          throw new Error('Error al convertir la imagen');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
//# sourceMappingURL=imagenModel.dev.js.map
