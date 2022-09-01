const { getProduct, addProduct } = require("../Controllers/ProductControllers");
const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//create product
router.post("/", verifyJWT, verifyAdmin, addProduct);

module.exports = router;
