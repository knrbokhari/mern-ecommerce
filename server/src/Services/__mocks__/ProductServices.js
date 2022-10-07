const Product = require("../../Models/Product");

let products = [
  {
    id: "1",
    name: "product01",
    description: "description",
    price: 10,
    quantity: 10,
    category: "phones",
    images: [],
    totalSell: 0,
  },
];

exports.getProductsServices = async () => {
  return products;
};

exports.getProductServices = async (id) => {
  let product = products.find((product) => product.id == id);
  return product;
};

exports.getSimilarProductServices = async (category) => {
  const similatProduct = products
    .filter((product) => product.category === category)
    .slice(0, 5);
  return similatProduct;
};
exports.addProductServices = async (data) => {
  const newProduct = new Product(data);
  products.push(newProduct);
  return newProduct;
};

exports.updateProductServices = async (id, data) => {
  const product = products.find((product) => product.id === id);
  product.name = data.name;
  return product;
};
exports.deleteProductServices = async () => {
  return [];
};
// exports.updateProductServices = async () => {}
// exports.updateProductServices = async () => {}
