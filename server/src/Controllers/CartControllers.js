const User = require("../Models/User");
const {
  findCartServices,
  addProductIntoCartServices,
  increaseCartProductQuantityServices,
  decreaseCartProductQuantityServices,
  removeProductFromCartServices,
} = require("../Services/CartServices");
const { findUserById } = require("../Services/UserServices");
const { NotFound } = require("../utils/error");

// add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const preCart = await findCartServices(userId, productId);
    if (preCart) {
      return res
        .status(200)
        .json({ msg: "You already added this product into your cart" });
    }

    const createCart = await addProductIntoCartServices(userId, productId);

    const user = await findUserById(userId);
    user.cart.push({ cartId: createCart._id });
    user.markModified("cart");
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// remove product from card
exports.removeFromCart = async (req, res) => {
  const { userId, productId, cartId } = req.body;
  try {
    const user = await findUserById(userId);

    const removeCart = await removeProductFromCartServices(userId, productId);

    const updateCart = user.cart.filter((p) => p.cartId?._id != removeCart.id);

    user.cart = updateCart;
    user.markModified("cart");
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// increase Cart quantity
exports.increaseCartProduct = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await findUserById(userId);
    const preCart = await findCartServices(userId, productId);
    if (!preCart) {
      throw new NotFound("Product not found");
    }

    await increaseCartProductQuantityServices(preCart._id);

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// decrease Cart quantity
exports.decreaseCartProduct = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await findUserById(userId);
    const preCart = await findCartServices(userId, productId);
    if (!preCart) {
      throw new NotFound("Product not found");
    }

    await decreaseCartProductQuantityServices(preCart._id);

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
