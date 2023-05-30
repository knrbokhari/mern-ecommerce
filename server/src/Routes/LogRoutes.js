const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { getLogs } = require("../Controllers/LogControllers");
const router = require("express").Router();

// get all order
router.get("/",  getLogs);

const configureLogRoutes = (app) => {
    app.use("/logs", router);
  };
  
  // module.exports = router;
  module.exports = configureLogRoutes;