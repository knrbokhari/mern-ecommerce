const { app } = require("../src/index");
const request = require("supertest");

jest.mock("../src/Services/UserServices");

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
});
