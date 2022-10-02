const Cart = require("../Models/Cart");

exports.findAllCartsServices = async () => {
  const carts = Cart.find();
  return carts;
};

exports.findCartServices = async (userId, ProductId) => {
  const cart = Cart.findOne({ userId: userId, product: ProductId });
  return cart;
};

exports.removeProductFromCartServices = async (userId, ProductId) => {
  const cart = Cart.findOneAndRemove({ userId: userId, product: ProductId });
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

// exports.
// exports.
// exports.
// exports.
