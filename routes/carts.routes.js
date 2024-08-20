const express = require("express");
const router = express.Router();
const CartManager = require("../classes/CartManager.js");
const cartManager = new CartManager("./src/data/cart.json");

router.post("/api/carts/", async (req, res) => {
    await cartManager.createCart();
    res.send({message: "Se creó el carrito correctamente"});
});

router.get("/api/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartContent = await cartManager.getCartContent(cartId);

    if (cartContent) {
        res.send({products: cartContent});
    } else {
        res.send({message: "El carrito con el ID ingresado no existe"});
    };
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    await cartManager.addToCart(cartId, productId);
    res.send({message: "Producto agregado al carrito con éxito"});
});

module.exports = router;