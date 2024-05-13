"use strict";

var sqlite3 = require('sqlite3').verbose(); // Crear conexión a la base de datos


var db = new sqlite3.Database('database.sqlite'); // Crear tabla de usuarios si no existe

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS usuarios (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nombre TEXT,\n    email TEXT UNIQUE,\n    password TEXT\n  )");
}); //Funcion para obtener un producto por su id

function obtenerPorId(id) {
  return regeneratorRuntime.async(function obtenerPorId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            db.query('SELECT * FROM productos WHERE id = ?', [id], function (err, results) {
              if (err) {
                console.error('Error al obtener el producto por ID:', err);
                reject(err);
              } else {
                console.log('Producto obtenido correctamente:', results);
                resolve(results);
              }
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
} // Función para insertar un nuevo usuario en la base de datos


function registrarUsuario(nombre, email, password) {
  return new Promise(function (resolve, reject) {
    var stmt = db.prepare('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)');
    stmt.run(nombre, email, password, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log('Usuario insertado correctamente');
        resolve();
      }

      stmt.finalize();
    });
  });
} // Función para obtener un usuario por su email


function obtenerUsuarioPorNombre(nombre, callback) {
  db.get('SELECT * FROM usuarios WHERE nombre = ?', [nombre], function (err, row) {
    if (err) {
      console.error(err.message);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
} // Función para obtener un usuario por su ID


function getUserById(id, callback) {
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], function (err, row) {
    if (err) {
      console.error(err.message);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

module.exports = {
  registrarUsuario: registrarUsuario,
  obtenerUsuarioPorNombre: obtenerUsuarioPorNombre,
  getUserById: getUserById
};
//# sourceMappingURL=db.dev.js.map
