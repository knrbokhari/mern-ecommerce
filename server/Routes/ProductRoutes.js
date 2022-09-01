const {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getAProduct,
} = require("../Controllers/ProductControllers");
const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//get a products;
router.get("/:id", getAProduct);

//create product
router.post("/", verifyJWT, verifyAdmin, addProduct);

// update product
router.patch("/:id", verifyJWT, verifyAdmin, updateProduct);

// delete product
router.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);

module.exports = router;
