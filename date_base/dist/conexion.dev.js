"use strict";

var mysql2 = require('mysql2');

var dotenv = require('dotenv');

dotenv.config();
var pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function obtenerConexion() {
  return pool.promise().getConnection();
}

module.exports = {
  pool: pool,
  obtenerConexion: obtenerConexion
};
//# sourceMappingURL=conexion.dev.js.map
