"use strict";

var express = require('express');

var app = express();

var session = require('express-session');

var path = require('path');

var router = require('./routes/routes');

var flash = require('connect-flash');

var conversionController = require('./controllers/conversionController');

var LocalStrategy = require('passport-local').Strategy;

var usuarios = require('./models/usermodel');

var multer = require('multer');

var dotenv = require('dotenv');

var MySQLStore = require('express-mysql-session')(session);

var cookieParser = require('cookie-parser');

var passport = require('passport');

var authMiddleware = require('./middlewares/authMiddleware'); // Middleware para procesar archivos estáticos en la carpeta 'public'


app.use(express["static"]('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}); // Middleware para procesar cookies

app.use(cookieParser()); // Configurar middleware para manejar sesiones

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
}); // --------------------------------------------------------------------
// Passport.js
// Configurar estrategia de autenticación local

passport.use(new LocalStrategy(function _callee(username, password, done) {
  var user, passwordMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(usuarios.obtenerPorNombre(username));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: 'Usuario incorrecto.'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(authMiddleware.comparePassword(password, user.contraseña));

        case 8:
          passwordMatch = _context.sent;

          if (passwordMatch) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: 'Contraseña incorrecta.'
          }));

        case 11:
          return _context.abrupt("return", done(null, user));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", done(_context.t0));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function _callee2(id, done) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(usuarios.obtenerPorId(id).then(function (user) {
            done(null, user);
          })["catch"](function (error) {
            done(error, null);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // --------------------------------------------------------------------
// Rutas para las páginas

app.use('/', router); // Configuración del motor de plantillas Pug

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Configurar Multer para manejar la carga de archivos en memoria

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
}); // Middleware para procesar datos de formulario con archivos

app.use(upload.single('seleccionarImg')); // Ruta para manejar la solicitud POST del formulario de carga

app.post('/convertir', conversionController.convertirImagen); // Puerto en el que escucha el servidor

var port = 3000;
app.listen(port, function () {
  console.log("Servidor iniciado en http://localhost:".concat(port));
});
//# sourceMappingURL=server.dev.js.map
