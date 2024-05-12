"use strict";

var sharp = require('sharp');

var _require = require('@svgdotjs/svg.js'),
    create = _require.create; // Importa 'create' desde svg.js


exports.convertirImagen = function _callee(req, res) {
  var imagenConvertida, formatoDestino, opciones, canvas, imageData;
  return regeneratorRuntime.async(function _callee$(_context) {
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
          formatoDestino = 'PNG'; // Predeterminado a PNG

          if (req.body.opciones) {
            opciones = req.body.opciones.toUpperCase();

            if (opciones === 'JPEG') {
              formatoDestino = 'jpeg';
            } else if (opciones === 'JPG') {
              formatoDestino = 'jpg';
            }
          }

          if (!(req.body.opciones === 'SVG')) {
            _context.next = 15;
            break;
          }

          // Crea un lienzo SVG
          canvas = create().size(500, 500); // Agrega la imagen al lienzo SVG

          _context.next = 9;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toBuffer());

        case 9:
          imageData = _context.sent;
          canvas.image(imageData).size(500, 500); // Obtén el SVG como una cadena

          imagenConvertida = canvas.svg(); // Configura el encabezado Content-Type para la respuesta

          res.set('Content-Type', 'image/svg+xml');
          _context.next = 19;
          break;

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toFormat(formatoDestino).toBuffer());

        case 17:
          imagenConvertida = _context.sent;
          // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
          res.set({
            'Content-Type': "image/".concat(formatoDestino),
            // Tipo de contenido de salida: PNG o JPEG
            'Content-Disposition': "attachment; filename=\"imagen_convertida.".concat(formatoDestino, "\"") // Nombre del archivo a descargar

          });

        case 19:
          // Enviar la imagen convertida al cliente
          res.send(imagenConvertida);
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error('Error al convertir la imagen:', _context.t0);
          res.status(500).send('Error interno del servidor');

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
};
//# sourceMappingURL=conversionController.dev.js.map
