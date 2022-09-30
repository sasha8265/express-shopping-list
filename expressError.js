const express = require("express")
const app = express()
const listRoutes = require("./routes/listRoutes")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/listRoutes", listRoutes);


/** 404 Error Handler */
app.use((req, res, next) => {
    return new ExpressError("Not Found", 404)
});


/** General Error Handler */
app.use((req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.msg
    });
});

module.exports = app;