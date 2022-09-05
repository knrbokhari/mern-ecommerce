const {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getAProduct,
  getBestSellingProducts,
  category,
  addToCart,
  removeFromCart,
  decreaseCartProduct,
  increaseCartProduct,
} = require("../Controllers/ProductControllers");
const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");

const router = require("express").Router();

//get products;
router.get("/", getProduct);

//get a products;
router.get("/:id", getAProduct);

// get best selling products  in all category
router.get("/bestselling", getBestSellingProducts);

router.get("/category/:category", category);

//create product
router.post("/", verifyJWT, addProduct);

// update product
router.patch("/:id", verifyJWT, verifyAdmin, updateProduct);

// delete product
router.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);

// cart routes
router.post("/add-to-cart", addToCart);

router.post("/remove-from-cart", verifyJWT, removeFromCart);

router.post("/increase-cart", verifyJWT, increaseCartProduct);

router.post("/decrease-cart", verifyJWT, decreaseCartProduct);

module.exports = router;
