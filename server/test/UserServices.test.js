const { app } = require("../src/index");
const request = require("supertest");

jest.mock("../src/Services/UserServices");

jest.mock("../src/Middleware/verifyJWT");

describe("UserController Test Suite", () => {
  test("get should return an array of users", async () => {
    let res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    let users = res.body;
    expect(users).toEqual(expect.any(Array));
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toEqual(expect.any(String));
    // console.log(res.body);
  });

  test("signin should return crate new user", async () => {
    const user = {
      name: "test02",
      email: "test02@gmail.com",
      password: "123456",
    };

    let res = await request(app).post("/users/signup").send(user);
    expect(res.statusCode).toBe(201);
    let newUser = res.body;
    expect(newUser._id).toEqual(expect.any(String));
    expect(newUser._id.length).toBe(24);
    expect(newUser.name).toEqual(user.name);
    expect(newUser.email).toEqual(user.email);
    expect(newUser.isAdmin).toEqual(false);
  });

  test("user id should return user", async () => {
    let res = await request(app).get("/users/1");
    expect(res.statusCode).toBe(200);
    let user = res.body;
    expect(user).toEqual(expect.any(Object));
    expect(user.id).toBe("1");
  });

  test("getUserOrders should return users orders", async () => {
    let res = await request(app).get("/users/1/orders");
    let order = res.body;
    expect(order).toEqual(expect.any(Array));
    expect(order[0]._id.length).toBe(24);
  });
});
