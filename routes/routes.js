const express = require('express');
const router = express.Router();
 // Middleware para proteger rutas

const index = require('./index');

// Configura las rutas
router.use('/', index);

module.exports = router;