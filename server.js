const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// Importa el enrutador
const router = require('./routes/routes');

// Importar el controlador de conversión
const conversionController = require('./controllers/conversionController');

// Configura el motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Usa el enrutador
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
