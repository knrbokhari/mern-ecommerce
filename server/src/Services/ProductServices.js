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

exports.getProductServices = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.getSimilarProductServices = async (category) => {
  const similarProduct = await Product.find({
    category: category,
  }).limit(5);
  return similarProduct;
};

// exports.
// exports.
// exports.
// exports.
