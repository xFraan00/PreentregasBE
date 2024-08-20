const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.routes.js");
const cartsRouter = require("./routes/carts.routes.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", productsRouter);
app.use("/", cartsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});