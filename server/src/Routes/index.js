const configureCartRoutes = require("./CartRoutes");
const configureImageRoutes = require("./ImageRoutes");
const configureOrderRoutes = require("./OrderRoutes");
const configureProductRoutes = require("./ProductRoutes");
const configureUserRoutes = require("./UserRoutes");

const configure = (app) => {
  configureUserRoutes(app);
  configureProductRoutes(app);
  configureImageRoutes(app);
  configureCartRoutes(app);
  configureOrderRoutes(app);
};

module.exports = configure;
