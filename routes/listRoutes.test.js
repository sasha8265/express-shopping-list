process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

test('GET /items - gets a list of our items', async () => {
    items.push({
        name: "test item",
        price: 2.75
    })
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{name: "test item", price: 2.75}])
})