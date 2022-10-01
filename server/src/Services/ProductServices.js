const Product = require("../Models/Product");

exports.getProductsServices = async () => {
  const products = await Product.find().sort({ _id: -1 });
  return products;
};
exports.addProductServices = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

exports.updateProductServices = async (id, data) => {
  const updateProduct = Product.findByIdAndUpdate(id, data, { new: true });
  return updateProduct;
};

// exports.
// exports.
