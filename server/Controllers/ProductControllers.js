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

// update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, price, category, images } = req.body;
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

// delete product
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

// get a product
exports.getAProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get best selling products  in all category
exports.getBestSellingProducts = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
