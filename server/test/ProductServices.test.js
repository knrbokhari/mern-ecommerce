const { app } = require("../src/index");
const request = require("supertest");

jest.mock("../src/Services/ProductServices");

jest.mock("../src/Middleware/verifyJWT");
jest.mock("../src/Middleware/verifyAdmin");

describe("ProductController Test Suite", () => {
  test("get /products route should return an array of products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    const products = res.body;
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].id).toEqual(expect.any(String));
  });

  test("get /products/:id route should return a product", async () => {
    const res = await request(app).get("/products/1");
    expect(res.statusCode).toBe(200);
    const product = res.body;
    expect(product.product).toEqual(expect.any(Object));
    expect(product.similar).toEqual(expect.any(Array));
    expect(product.similar.length).toBeGreaterThan(0);
    expect(product.similar.length).toBeLessThanOrEqual(5);
  });

  test("post /products route should return a new product", async () => {
    const product = {
      name: "product02",
      description: "description",
      price: 10,
      quantity: 10,
      category: "phones",
      images: [
        {
          url: "image.img",
        },
      ],
    };

    const res = await request(app).post("/products").send(product);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toEqual(true);
    const newProduct = res.body.newProduct;
    expect(newProduct).toEqual(expect.any(Object));
    expect(newProduct._id.length).toEqual(24);
  });

  test("patch /products/:id route should update product", async () => {
    const product = {
      name: "Updated name",
    };
    const res = await request(app).patch("/products/1").send(product);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
    const updatedProduct = res.body.updatedProduct;
    expect(updatedProduct.name).toEqual(product.name);
  });

  test("delete by id should return success message ", async () => {
    const res = await request(app).delete("/products/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.msg).toEqual("Product deleted successfully");
  });
});
