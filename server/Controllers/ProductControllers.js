const Product = require("../Models/Product");
const User = require("../Models/User");

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
    const { name, description, price, category, quantity, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      quantity,
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
    const { name, description, price, category, quantity, images } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      quantity,
      images,
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
    const similar = await Product.find({
      category: product.category,
    }).limit(5);
    // console.log(similar);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get best selling products  in all category
exports.getBestSellingProducts = async (req, res) => {};

exports.category = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    const sort = { _id: -1 };
    if (category === "all") {
      const products = await Product.find().sort(sort);
      res.status(200).json(products);
    } else {
      const products = await Product.find({ category }).sort(sort);
      res.status(200).json(products);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, price } = req.body;

  // console.log(req.body);

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.increaseCartProduct = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.decreaseCartProduct = async (req, res) => {};

// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
