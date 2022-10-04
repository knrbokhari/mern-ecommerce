const Cart = require("../Models/Cart");

exports.findAllCartsServices = async () => {
  const carts = Cart.find();
  return carts;
};

exports.findCartServices = async (userId, ProductId) => {
  const cart = Cart.findOne({
    userId: userId,
    product: ProductId,
    order: false,
  });
  return cart;
};

exports.findCartByIdServices = async (id) => {
  const cart = Cart.findById(id);
  return cart;
};

exports.removeProductFromCartServices = async (id) => {
  const cart = Cart.findByIdAndDelete(id);
  return cart;
};

exports.addProductIntoCartServices = async (userId, ProductId) => {
  const addedCart = await Cart.create({
    userId: userId,
    product: ProductId,
  });
  return addedCart;
};

exports.increaseCartProductQuantityServices = async (id) => {
  const product = await Cart.findByIdAndUpdate(
    id,
    { $inc: { quantity: 1 } },
    { new: true }
  );
  return product;
};

exports.decreaseCartProductQuantityServices = async (id) => {
  const product = await Cart.findByIdAndUpdate(
    id,
    { $inc: { quantity: -1 } },
    { new: true }
  );
  return product;
};

exports.updateCartOnOrderServices = async (id) => {
  const product = await Cart.findByIdAndUpdate(
    id,
    { order: true },
    { new: true }
  );
  return product;
};

// exports.
// exports.
// exports.
