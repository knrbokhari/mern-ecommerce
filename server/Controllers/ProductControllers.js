import Product from "../Models/Product";

exports.getProduct = async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
// exports.getProduct = async (req, res) =>{}
// exports.getProduct = async (req, res) =>{}
// exports.getProduct = async (req, res) =>{}
