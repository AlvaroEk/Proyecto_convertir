const sharp = require('sharp');
const { create } = require('@svgdotjs/svg.js'); // Importa 'create' desde svg.js

exports.convertirImagen = async (req, res) => {
  try {
    // Verificar si se ha proporcionado un archivo y si es una imagen
    if (!req.file) {
      return res.status(400).send('No se ha proporcionado ningún archivo');
    }

    let imagenConvertida;
    let formatoDestino = 'PNG'; // Predeterminado a PNG
    
    if (req.body.opciones) {
      const opciones = req.body.opciones.toUpperCase();
      if (opciones === 'JPEG') {
        formatoDestino = 'jpeg'; 
      } else if (opciones === 'JPG') {
        formatoDestino = 'jpg'; 
      }
    }

    if (req.body.opciones === 'SVG') {
      // Crea un lienzo SVG
      const canvas = create().size(500, 500);

      // Agrega la imagen al lienzo SVG
      const imageData = await sharp(req.file.buffer).toBuffer();
      canvas.image(imageData).size(500, 500);

      // Obtén el SVG como una cadena
      imagenConvertida = canvas.svg();

      // Configura el encabezado Content-Type para la respuesta
      res.set('Content-Type', 'image/svg+xml');
    } else {
      // Convertir la imagen al formato seleccionado
      imagenConvertida = await sharp(req.file.buffer).toFormat(formatoDestino).toBuffer();

      // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
      res.set({
        'Content-Type': `image/${formatoDestino}`, // Tipo de contenido de salida: PNG o JPEG
        'Content-Disposition': `attachment; filename="imagen_convertida.${formatoDestino}"`, // Nombre del archivo a descargar
      });
    }

    // Enviar la imagen convertida al cliente
    res.send(imagenConvertida);
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    res.status(500).send('Error interno del servidor');
  }
};
