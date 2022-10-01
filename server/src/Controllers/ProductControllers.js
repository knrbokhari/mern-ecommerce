const Product = require("../Models/Product");
const User = require("../Models/User");
const {
  getProductsServices,
  addProductServices,
  updateProductServices,
  getProductServices,
  getSimilarProductServices,
  findBestSellingProducts,
  deleteProductServices,
} = require("../Services/ProductServices");
const { NotFound } = require("../utils/error");

//get products
exports.getProducts = async (req, res) => {
  try {
    const products = await getProductsServices();

    if (!products.length)
      return res
        .status(200)
        .json({ success: true, msg: "No product created yet" });

    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//create product
exports.addProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const newProduct = await addProductServices(req.body);

    res.status(201).json({
      success: true,
      newProduct,
      msg: "New product added successfully",
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await updateProductServices(id, req.body);
    res.status(200).json({
      success: true,
      updatedProduct,
      msg: "Product update successfully",
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductServices(id);
    if (!product) {
      throw new NotFound("Product not found");
    }

    await deleteProductServices(id);
    
    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get a product
exports.getAProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductServices(id);

    if (!product) throw new NotFound("Product not found");

    const similar = await getSimilarProductServices(product.category);

    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// get best selling products  in all category
exports.getBestSellingProducts = async (req, res) => {
  const num = req.params.num;

  try {
    const laptop = await findBestSellingProducts("laptop");

    const technology = await findBestSellingProducts("technology");

    const phones = await findBestSellingProducts("phones");

    res.status(200).json([...laptop, ...phones, ...technology]);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.category = async (req, res) => {
  const { category } = req.params;
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

exports.decreaseCartProduct = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
// exports.deleteProduct = async (req, res) => {};
