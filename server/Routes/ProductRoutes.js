const { getProduct } = require("../Controllers/ProductControllers");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

module.exports = router;
