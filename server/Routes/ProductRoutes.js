const { getProduct, addProduct } = require("../Controllers/ProductControllers");
const verifyJWT = require("../Middleware/verifyJWT");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//create product
router.post("/", verifyJWT, addProduct);

module.exports = router;
