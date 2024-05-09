const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('../controllers/loginController');

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});

// Ruta para manejar el inicio de sesión (POST)
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  // Si se autentica correctamente, puedes agregar el código aquí para manejar la respuesta
});

module.exports = router;
