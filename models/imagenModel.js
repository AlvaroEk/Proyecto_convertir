const sharp = require('sharp');
const path = require('path');

exports.convertirImagen = async (rutaImagenOriginal, formato) => {
  try {
    console.log('Ruta de la imagen original:', rutaImagenOriginal);
    console.log('Formato:', formato);

    const nombreArchivoConvertido = `convertida_${Date.now()}.${formato.toLowerCase()}`;
    const rutaImagenConvertida = path.join(__dirname, `../public/converted/${nombreArchivoConvertido}`);

    // Utiliza Sharp u otra biblioteca para convertir la imagen
    await sharp(rutaImagenOriginal)
      .toFormat(formato.toLowerCase())
      .toFile(rutaImagenConvertida);

    console.log('Imagen convertida con éxito a:', rutaImagenConvertida);

    return rutaImagenConvertida;
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    throw new Error('Error al convertir la imagen');
  }
};
