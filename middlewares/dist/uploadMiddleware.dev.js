"use strict";

var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
module.exports = upload;
//# sourceMappingURL=uploadMiddleware.dev.js.map
