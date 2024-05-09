const conexion = require('../conexion');

async function registrarUsuario(nombre, email, password) {
    const db = conexion.crearConexion();
    return new Promise((resolve, reject) => {
         db.query(
            'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
            [nombre, email, password],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
               
                console.log('Usuario insertado correctamente');
                resolve();
            }
        });
        db.end();
    });
}
// Función para obtener un usuario por su email

async function obtenerUsuarioPorNombre(nombre) {
    const db = conexion.crearConexion();
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM usuarios WHERE nombre = ?',
            [nombre],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
        db.end();
    });
}


// Función para obtener un usuario por su ID
async function obtenerUsuarioPorId(id) {
    const db = conexion.crearConexion(); 
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
        db.end();
    });
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId
};