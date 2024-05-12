"use strict";

var multer = require('multer'); // Configurar el middleware multer para manejar la carga de archivos


var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
module.exports = upload;
//# sourceMappingURL=uploadMiddleware.dev.js.map
