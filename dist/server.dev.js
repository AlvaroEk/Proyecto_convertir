"use strict";

var express = require('express');

var app = express();

var path = require('path');

var multer = require('multer'); // Importa el enrutador


var router = require('./routes/routes'); // Importar el controlador de conversión


var conversionController = require('./controllers/conversionController'); // Configura el motor de vistas


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Usa el enrutador

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
