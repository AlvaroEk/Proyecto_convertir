const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const router = require('./routes/routes'); // Importa el enrutador
const conversionController = require('./controllers/conversionController'); // Importar el controlador de conversión
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SQLiteStore = require('connect-sqlite3')(session);
const db = require('./db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

//Configura Cookie Parser
app.use(cookieParser());

dotenv.config();

// Configurar middleware para manejar sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' }) // Almacena las sesiones en una base de datos SQLite
}));

// Configura connect-flash
app.use(flash());

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  (username, password, done) => {
    db.obtenerUsuarioPorNombre(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Usuario incorrecto.' }); }
      if (user.password !== password) { return done(null, false, { message: 'Contraseña incorrecta.' }); }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.getUserById(id, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  });
});

app.use((req, res, next) => {
  res.locals.carrito = req.session.carrito || [];
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

app.use(express.urlencoded({ extended: true }));

// Configura el motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
app.use('/', router);

// Ruta para los estilos
app.use(express.static('public'));

// Configurar Multer para manejar la carga de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware para procesar datos de formulario con archivos
app.use(upload.single('seleccionarImg'));

// Ruta para manejar la solicitud POST del formulario de carga
app.post('/convertir', conversionController.convertirImagen);

// Puerto del servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
