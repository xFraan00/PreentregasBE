import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";

const socketManager = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        // Evento para crear un nuevo producto
        socket.on("newProduct", async (data) => {
            try {
                data.price = parseInt(data.price);
                data.stock = parseInt(data.stock);
                await productModel.create(data);
                console.log("Producto creado con éxito");
            } catch (error) {
                console.error("Error al crear el producto:", error);
            }
        });

        // Evento para eliminar un producto
        socket.on("deleteProduct", async (productId) => {
            try {
                await productModel.deleteOne({ _id: productId });
                console.log("Producto eliminado con éxito");
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        });

        // Evento para agregar un producto al carrito
        socket.on("addToCart", async (productId) => {
            try {
                let cart = await cartModel.findOne({ _id: "66552db663453d4d60b45b91" });

                // Verificar si el carrito existe
                if (!cart) {
                    console.log("No se encontró el carrito, creando uno nuevo...");
                    cart = new cartModel({ products: [] });  // Crear un nuevo carrito vacío
                }

                // Agregar producto al carrito
                cart.products.push({ product: productId });
                await cart.save();
                console.log("Producto agregado al carrito con éxito");
            } catch (error) {
                console.error("Error al agregar producto al carrito:", error);
            }
        });
    });
};

export default socketManager;
