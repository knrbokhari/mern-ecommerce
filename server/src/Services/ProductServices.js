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

exports.findBestSellingProducts = async (category) => {
  const bestSellingProduct = await Product.find({
    category: category,
  })
    .sort({ totalSell: -1 })
    .limit(1);
  return bestSellingProduct;
};

exports.deleteProductServices = async (id) => {
  const product = Product.findByIdAndRemove(id);
  return product;
};

exports.getProductsByCategoryServices = async (data) => {
  const products = await Product.find({ category: data }).sort({ _id: -1 });
  return products;
};

exports.reduceProductQuantityAfterOrderServices = async (id, quantity) => {
  const product = await Product.findById(id);
  product.quantity -= quantity;
  product.totalSell += quantity;
  product.markModified("quantity");
  await product.save();
  return product;
};

exports.totalSellServices = async () => {
  // const data = [];
  const totalSell = await Product.aggregate([
    {
      $group: {
        _id: "Total Sales",
        value: { $sum: "$totalSell" },
        // product: { $sum: "$quantity" },
      },
    },
    // {
    //   $project: {
    //     _id: "Available Products",
    //     // totalSells: { $count: "$totalSell" },
    //     value: { $sum: "$quantity" },
    //   },
    // },
  ]);

  const available = await Product.aggregate([
    {
      $group: {
        _id: "Available Products",
        // totalSells: { $count: "$totalSell" },
        value: { $sum: "$quantity" },
      },
    },
  ]);

  return [...totalSell, ...available];
};
