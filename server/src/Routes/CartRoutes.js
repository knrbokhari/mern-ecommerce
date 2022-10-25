const verifyJWT = require("../Middleware/verifyJWT");
const verifyAdmin = require("../Middleware/verifyAdmin");
const {
  addToCart,
  removeFromCart,
  increaseCartProduct,
  decreaseCartProduct,
} = require("../Controllers/CartControllers");
const router = require("express").Router();

// cart routes
router.post("/add-to-cart", addToCart);

// remove product from card
router.post("/remove-from-cart", removeFromCart);

// increase Cart quantity
router.post("/increase-cart", increaseCartProduct);

// decrease Cart quantity
router.post("/decrease-cart", decreaseCartProduct);

const configureCartRoutes = (app) => {
  app.use("/cart", router);
};

// module.exports = router;
module.exports = configureCartRoutes;
