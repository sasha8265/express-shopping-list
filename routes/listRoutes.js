const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const listItems = require("../fakeDb")

/** GET /items - gets all items in list of items */
router.get("/", function (req, res) {
    return res.json(listItems)
})

/** POST /items - adds new item to list of items */
router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price }
    listItems.push(newItem)
    return res.status(201).json({added: newItem})
})

/** GET /items/[item-name] - gets single item from list by name */
router.get("/:name", function (req, res) {
    const foundItem = listItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    return res.json(foundItem)
})

/** PATCH /items/[item-name] - updates single item from list by name */
router.patch("/:name", function (req, res) {
    const foundItem = listItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.status(200).json({ updated: foundItem })
})

/** DELETE /items/[item-name] - deletes single item from list by name */
router.delete("/:name", function (req, res) {
    const foundItem = listItems.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    listItems.splice(foundItem, 1)
    return res.json({ message: `${req.params.name} DELETED`})
})

module.exports = router;