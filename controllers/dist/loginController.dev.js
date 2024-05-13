"use strict";

function mostrarLogin() {
  var contrasenaInput = document.getElementById('contrasena');
  var botonMostrarContrasena = document.getElementById('mostrarContrasena');

  if (contrasenaInput.type === 'password') {
    contrasenaInput.type = 'text';
    botonMostrarContrasena.innerHTML = '<i class="material-symbols-rounded">visibility</i>';
  } else {
    contrasenaInput.type = 'password';
    botonMostrarContrasena.innerHTML = '<i class="material-symbols-rounded">visibility_off</i>';
  }
} // Mostrar la página de login


exports.mostrarLogin = function (req, res) {
  res.render('login'); // Renderiza el archivo login.pug
};
//# sourceMappingURL=loginController.dev.js.map
