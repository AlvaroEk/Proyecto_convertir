const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const flash = require('connect-flash');
const conversionController = require('./controllers/conversionController'); 
const LocalStrategy = require('passport-local').Strategy;
const usuarios = require('./models/usermodel');
const multer = require('multer');
const dotenv = require('dotenv');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const passport = require('passport');
const authMiddleware = require('./middlewares/authMiddleware'); 

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Middleware para procesar cookies
app.use(cookieParser());

// Configurar middleware para manejar sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Configurar connect-flash
app.use(flash());

// --------------------------------------------------------------------

// Passport.js

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usuarios.obtenerPorNombre(username);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await authMiddleware.comparePassword(password, user.contraseña);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarios.obtenerPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});


// --------------------------------------------------------------------

// Rutas para las páginas
app.use('/', router);

// Configuración del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configurar Multer para manejar la carga de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware para procesar datos de formulario con archivos
app.use(upload.single('seleccionarImg'));

// Ruta para manejar la solicitud POST del formulario de carga
app.post('/convertir', conversionController.convertirImagen);

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
