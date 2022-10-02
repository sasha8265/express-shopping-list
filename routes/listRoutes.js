const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const listItems = require("../fakeDb")


router.get("/", function (req, res) {
    return res.json(listItems)
})

router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price }
    listItems.push(newItem)
    return res.status(201).json({added: newItem})
})

router.get("/:name", function (req, res) {
    const foundItem = listItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    return res.json(foundItem)
})

router.patch("/:name", function (req, res) {
    const foundItem = listItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.status(200).json({ updated: foundItem })
})

module.exports = router;