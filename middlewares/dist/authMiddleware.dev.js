"use strict";

// authMiddleware.js
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var dotenv = require('dotenv');

var path = require('path'); //Configura DotEnv


dotenv.config();

function authenticate(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function authenticate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Verifica si hay un token en las cookies de la solicitud
          token = req.cookies.token; // Si no hay token, redirige al usuario al login

          if (token) {
            _context.next = 4;
            break;
          }

          console.log("no hay token");
          return _context.abrupt("return", res.redirect('/login'));

        case 4:
          _context.prev = 4;
          // Verifica el token usando la clave secreta
          decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Almacena el ID del usuario en la solicitud para su posterior uso

          req.userId = decoded.userId;
          console.log("token y decoded y userID\n", token, decoded, userId);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          // Si hay un error en la verificación del token, redirige al usuario al login
          console.log("hay un problema con el login xd");
          return _context.abrupt("return", res.redirect('/login'));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
} // Función para generar un token JWT


function generateToken(userId) {
  // Crea un token con el ID de usuario y una clave secreta
  return jwt.sign({
    userId: userId
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
  });
}

function getHash(passwordString) {
  var saltRounds, password_hash;
  return regeneratorRuntime.async(function getHash$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(passwordString, saltRounds));

        case 3:
          password_hash = _context2.sent;
          return _context2.abrupt("return", password_hash);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function comparePassword(passwordString, bdHash) {
  var compareHashes;
  return regeneratorRuntime.async(function comparePassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('passwordString', passwordString);
          console.log('bdHash', bdHash);
          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.compare(passwordString, bdHash));

        case 4:
          compareHashes = _context3.sent;
          return _context3.abrupt("return", compareHashes);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  authenticate: authenticate,
  generateToken: generateToken,
  getHash: getHash,
  comparePassword: comparePassword
};
//# sourceMappingURL=authMiddleware.dev.js.map
