<<<<<<< HEAD
const express = require('express');
const router = express.Router();
 // Middleware para proteger rutas
const loginController = require('../controllers/loginController');
const registro = require('./registro');

const index = require('./index');

// Configura las rutas
router.use('/', index);
router.get('/login', loginController.mostrarLogin);
router.use('/registro', registro);



=======
const express = require('express');
const router = express.Router();
 // Middleware para proteger rutas

const index = require('./index');

// Configura las rutas
router.use('/', index);

>>>>>>> e2fcdc8764734a99a89386579c7668e3b207e8ab
module.exports = router;