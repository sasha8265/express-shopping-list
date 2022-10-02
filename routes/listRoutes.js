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
    return res.json({added: newItem})
})

module.exports = router;