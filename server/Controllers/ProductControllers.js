const Product = require("../Models/Product");

//get products
exports.getProduct = async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//create product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
