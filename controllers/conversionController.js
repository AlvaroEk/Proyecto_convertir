const sharp = require('sharp');
const potrace = require('potrace');
const { insertarRegistro } = require('../models/historymodel');

async function convertirImagen(req, res) {
  try {
    // Verificar si se ha proporcionado un archivo y si es una imagen
    if (!req.file) {
      return res.status(400).send('No se ha proporcionado ningún archivo');
    }

    let formatoDestino = 'png'; // Predeterminado a PNG

    if (req.body.opciones) {
      const opciones = req.body.opciones.toUpperCase();
      if (opciones === 'JPEG') {
        formatoDestino = 'jpeg'; 
      } else if (opciones === 'JPG') {
        formatoDestino = 'jpg'; 
      } else if (opciones === 'SVG' || opciones === 'PNG' || opciones === 'WEBP') {
        formatoDestino = opciones.toLowerCase(); 
      }
    }

    // Convertir la imagen a formato destino
    let buffer;
    if (formatoDestino === 'svg') {
      buffer = await sharp(req.file.buffer).toBuffer();
      buffer = await new Promise((resolve, reject) => {
        potrace.trace(buffer, { threshold: 128 }, (err, svg) => {
          if (err) {
            reject(err);
          } else {
            resolve(svg);
          }
        });
      });
    } else {
      buffer = await sharp(req.file.buffer).toFormat(formatoDestino).toBuffer();
    }
    

    // Insertar un registro en la base de datos
    await insertarRegistro(req.file.originalname, `imagen_convertida.${formatoDestino}`, formatoDestino);

    let conversionesRealizadas = req.session.conversionesRealizadas || 0;

    if (!req.isAuthenticated()) {
      // Si el usuario no está autenticado, verificar el límite de conversiones
      if (conversionesRealizadas < 3) {
        conversionesRealizadas++;
        req.session.conversionesRealizadas = conversionesRealizadas;
      } else {
        // Si el usuario ha realizado tres conversiones y no está autenticado, redirigir al usuario al inicio de sesión
        return res.redirect('/login');
      }
    }

    // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
    res.set({
      'Content-Type': `image/${formatoDestino}`, // Tipo de contenido de salida: PNG, JPEG, SVG, WEBP
      'Content-Disposition': `attachment; filename="imagen_convertida.${formatoDestino}"`, // Nombre del archivo a descargar
    });

    // Enviar la imagen convertida al cliente
    res.send(buffer);
    
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  convertirImagen,
};
