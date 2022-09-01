const { getProduct, addProduct } = require("../Controllers/ProductControllers");
const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//create product
router.post("/", verifyJWT, verifyAdmin, addProduct);

// update product
router.patch("/:id", verifyJWT, verifyAdmin);

module.exports = router;
