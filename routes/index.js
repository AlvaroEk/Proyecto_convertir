<<<<<<< HEAD
// routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: req.user != null ? `Bienvenido ${req.user.nombre}` : 'Convertidor de imagen ', user: req.user != null ? `${req.user.nombre}` : ''});
});

=======
// routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: req.user != null ? `Bienvenido ${req.user.nombre}` : 'Convertidor de imagen ', user: req.user != null ? `${req.user.nombre}` : ''});
});

>>>>>>> e2fcdc8764734a99a89386579c7668e3b207e8ab
module.exports = router;