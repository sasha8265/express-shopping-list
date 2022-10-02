process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

beforeEach(function () {
    items.length = 0;
})

test('GET /items - gets a list of our items', async () => {
    items.push({
        name: "test item",
        price: 2.75
    })
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{name: "test item", price: 2.75}])
})

test('POST /items - adds an item to our list of items', async () => {
    const res = await request(app)
        .post('/items')
        .send({
            name: "test item",
            price: 2.75
        });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
        added: {
            name: "test item",
            price: 2.75
        }
    });
})