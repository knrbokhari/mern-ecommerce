const { getProduct, addProduct } = require("../Controllers/ProductControllers");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//create product
router.post("/", addProduct);

module.exports = router;
