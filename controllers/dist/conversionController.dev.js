"use strict";

var sharp = require('sharp');

exports.convertirImagen = function _callee(req, res) {
  var formatoDestino, imagenConvertida;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(!req.file || !req.file.mimetype.startsWith('image/jpeg'))) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send('El archivo cargado no es una imagen JPG válida'));

        case 3:
          // Determinar el formato al que se debe convertir
          formatoDestino = 'png'; // Predeterminado a PNG

          if (req.body.opciones === 'JPEG') {
            formatoDestino = 'jpeg';
          } // Convertir la imagen de JPG al formato seleccionado


          _context.next = 7;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toFormat(formatoDestino).toBuffer());

        case 7:
          imagenConvertida = _context.sent;
          // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
          res.set({
            'Content-Type': "image/".concat(formatoDestino),
            // Tipo de contenido de salida: PNG o JPEG
            'Content-Disposition': "attachment; filename=\"imagen_convertida.".concat(formatoDestino, "\"") // Nombre del archivo a descargar

          }); // Enviar la imagen convertida al cliente

          res.send(imagenConvertida);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error al convertir la imagen:', _context.t0);
          res.status(500).send('Error interno del servidor');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
//# sourceMappingURL=conversionController.dev.js.map
