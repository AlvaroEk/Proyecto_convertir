"use strict";

var express = require('express');

var app = express();

var path = require('path');

var multer = require('multer');

var router = require('./routes/routes'); // Importa el enrutador


var conversionController = require('./controllers/conversionController'); // Importar el controlador de conversión


var session = require('express-session');

var flash = require('connect-flash');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var SQLiteStore = require('connect-sqlite3')(session);

var db = require('./db');

var dotenv = require('dotenv');

var cookieParser = require('cookie-parser'); //Configura Cookie Parser


app.use(cookieParser());
dotenv.config(); // Configurar middleware para manejar sesiones

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({
    db: 'sessionsDB.sqlite',
    table: 'sessions'
  }) // Almacena las sesiones en una base de datos SQLite

})); // Configura connect-flash

app.use(flash()); // Configurar Passport.js

app.use(passport.initialize());
app.use(passport.session()); // Configurar estrategia de autenticación local

passport.use(new LocalStrategy(function (username, password, done) {
  db.obtenerUsuarioPorNombre(username, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: 'Usuario incorrecto.'
      });
    }

    if (user.password !== password) {
      return done(null, false, {
        message: 'Contraseña incorrecta.'
      });
    }

    return done(null, user);
  });
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  db.getUserById(id, function (err, user) {
    done(err, user);
  });
});
app.use(function (req, res, next) {
  res.locals.carrito = req.session.carrito || [];
  console.log("Solicitud recibida: ".concat(req.method, " ").concat(req.url));
  next();
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});
app.use(express.urlencoded({
  extended: true
})); // Configura el motor de vistas

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Middleware para procesar archivos estáticos en la carpeta 'public'

app.use(express["static"]('public'));
app.use(express.json());
app.use('/', router); // Ruta para los estilos

app.use(express["static"]('public')); // Configurar Multer para manejar la carga de archivos en memoria

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
}); // Middleware para procesar datos de formulario con archivos

app.use(upload.single('seleccionarImg')); // Ruta para manejar la solicitud POST del formulario de carga

app.post('/convertir', conversionController.convertirImagen); // Puerto del servidor

var port = 3000;
app.listen(port, function () {
  console.log("Servidor iniciado en http://localhost:".concat(port));
});
//# sourceMappingURL=server.dev.js.map
