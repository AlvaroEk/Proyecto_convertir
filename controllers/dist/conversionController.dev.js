"use strict";

var sharp = require('sharp');

var potrace = require('potrace');

var _require = require('../models/historymodel'),
    insertarRegistro = _require.insertarRegistro;

function convertirImagen(req, res) {
  var formatoDestino, opciones, buffer;
  return regeneratorRuntime.async(function convertirImagen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.file) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send('No se ha proporcionado ningún archivo'));

        case 3:
          formatoDestino = 'png'; // Predeterminado a PNG

          if (req.body.opciones) {
            opciones = req.body.opciones.toUpperCase();

            if (opciones === 'JPEG') {
              formatoDestino = 'jpeg';
            } else if (opciones === 'JPG') {
              formatoDestino = 'jpg';
            } else if (opciones === 'SVG' || opciones === 'PNG' || opciones === 'WEBP') {
              formatoDestino = opciones.toLowerCase();
            }
          } // Convertir la imagen a formato destino


          if (!(formatoDestino === 'svg')) {
            _context.next = 14;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toBuffer());

        case 8:
          buffer = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            potrace.trace(buffer, {
              threshold: 128
            }, function (err, svg) {
              if (err) {
                reject(err);
              } else {
                resolve(svg);
              }
            });
          }));

        case 11:
          buffer = _context.sent;
          _context.next = 17;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toFormat(formatoDestino).toBuffer());

        case 16:
          buffer = _context.sent;

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(insertarRegistro(req.file.originalname, "imagen_convertida.".concat(formatoDestino), formatoDestino));

        case 19:
          // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
          res.set({
            'Content-Type': "image/".concat(formatoDestino),
            // Tipo de contenido de salida: PNG, JPEG, SVG, WEBP
            'Content-Disposition': "attachment; filename=\"imagen_convertida.".concat(formatoDestino, "\"") // Nombre del archivo a descargar

          }); // Enviar la imagen convertida al cliente

          res.send(buffer);
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.error('Error al convertir la imagen:', _context.t0);
          res.status(500).send('Error interno del servidor');

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

module.exports = {
  convertirImagen: convertirImagen
};
//# sourceMappingURL=conversionController.dev.js.map
