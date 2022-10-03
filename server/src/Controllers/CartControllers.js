const User = require("../Models/User");
const {
  findCartServices,
  addProductIntoCartServices,
  increaseCartProductQuantityServices,
  decreaseCartProductQuantityServices,
  removeProductFromCartServices,
  findCartByIdServices,
} = require("../Services/CartServices");
const { findUserById } = require("../Services/UserServices");
const { NotFound } = require("../utils/error");

// add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await findUserById(userId);
    const preCart = await findCartServices(userId, productId);
    if (preCart) {
      await increaseCartProductQuantityServices(preCart._id);
      const user = await findUserById(userId);
      return res.status(200).json(user);
    }

    const createCart = await addProductIntoCartServices(userId, productId);

    user.cart.push({ cartId: createCart._id });
    user.markModified("cart");
    await user.save();

    const reUser = await findUserById(userId);

    res.status(200).json(reUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// remove product from card
exports.removeFromCart = async (req, res) => {
  const { cartId } = req.body;

  try {
    const preCart = await findCartByIdServices(cartId);

    if (!preCart) {
      throw new NotFound("Product not found");
    }

    const user = await findUserById(preCart.userId);
    const userCart = user.cart;

    const updateCart = userCart.filter((i) => i.cartId._id != cartId);

    user.cart = updateCart;
    user.markModified("cart");
    await user.save();

    await removeProductFromCartServices(cartId);

    const reUser = await findUserById(preCart.userId);

    res.status(200).json(reUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// increase Cart quantity
exports.increaseCartProduct = async (req, res) => {
  const { cartId } = req.body;

  try {
    const preCart = await findCartByIdServices(cartId);

    if (!preCart) {
      throw new NotFound("Product not found");
    }

    await increaseCartProductQuantityServices(preCart._id);

    const user = await findUserById(preCart.userId);

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// decrease Cart quantity
exports.decreaseCartProduct = async (req, res) => {
  const { cartId } = req.body;

  try {
    const preCart = await findCartByIdServices(cartId);

    if (!preCart) {
      throw new NotFound("Product not found");
    }

    await decreaseCartProductQuantityServices(preCart._id);

    const user = await findUserById(preCart.userId);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
