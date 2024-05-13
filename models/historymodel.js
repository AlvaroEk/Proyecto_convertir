const { obtenerConexion } = require('../date_base/conexion');

// Función para insertar un registro en la tabla historial_imagenes
async function insertarRegistro(nombreOriginal, nombreConvertido, formatoDestino) {
  let conexion;
  try {
    conexion = await obtenerConexion();
    await conexion.query('INSERT INTO historial_imagenes (nombre_original, nombre_convertido, formato) VALUES (?, ?, ?)', [nombreOriginal, nombreConvertido, formatoDestino]);
    console.log('Registro insertado correctamente');
  } catch (error) {
    console.error('Error al insertar registro en historial_imagenes:', error);
    throw error;
  } finally {
    // Liberar la conexión si se estableció correctamente
    if (conexion) {
      conexion.release();
    }
  }
}

module.exports = {
  insertarRegistro
};
