<<<<<<< HEAD
const sharp = require('sharp');

exports.convertirImagen = async (req, res) => {
  try {
    // Verificar si se ha proporcionado un archivo y si es una imagen
    if (!req.file || !req.file.mimetype.startsWith('image/jpeg')) {
      return res.status(400).send('El archivo cargado no es una imagen JPG válida');
    }

    // Determinar el formato al que se debe convertir
    let formatoDestino = 'png'; // Predeterminado a PNG
    if (req.body.opciones === 'JPEG') {
      formatoDestino = 'jpeg';
    }

    // Convertir la imagen de JPG al formato seleccionado
    const imagenConvertida = await sharp(req.file.buffer).toFormat(formatoDestino).toBuffer();

    // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
    res.set({
      'Content-Type': `image/${formatoDestino}`, // Tipo de contenido de salida: PNG o JPEG
      'Content-Disposition': `attachment; filename="imagen_convertida.${formatoDestino}"`, // Nombre del archivo a descargar
    });

    // Enviar la imagen convertida al cliente
    res.send(imagenConvertida);
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    res.status(500).send('Error interno del servidor');
  }
};
=======
const sharp = require('sharp');

exports.convertirImagen = async (req, res) => {
  try {
    // Verificar si se ha proporcionado un archivo y si es una imagen
    if (!req.file || !req.file.mimetype.startsWith('image/jpeg')) {
      return res.status(400).send('El archivo cargado no es una imagen JPG válida');
    }

    // Determinar el formato al que se debe convertir
    let formatoDestino = 'png'; // Predeterminado a PNG
    if (req.body.opciones === 'JPEG') {
      formatoDestino = 'jpeg';
    }

    // Convertir la imagen de JPG al formato seleccionado
    const imagenConvertida = await sharp(req.file.buffer).toFormat(formatoDestino).toBuffer();

    // Configurar el encabezado Content-Disposition para que el navegador descargue la imagen
    res.set({
      'Content-Type': `image/${formatoDestino}`, // Tipo de contenido de salida: PNG o JPEG
      'Content-Disposition': `attachment; filename="imagen_convertida.${formatoDestino}"`, // Nombre del archivo a descargar
    });

    // Enviar la imagen convertida al cliente
    res.send(imagenConvertida);
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    res.status(500).send('Error interno del servidor');
  }
};
>>>>>>> e2fcdc8764734a99a89386579c7668e3b207e8ab
