const express = require("express");
const server = express();
const PORT = process.env.PORT || 8000;

const manager = require("./products");
const cart = require("./cart");

server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
})

//Accept different properties
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get("/api/products", async (req, res) => {
    let limit = req.query.limit ?? null;
    let products = (await manager.getProducts()).products;
    console.log(products);
    try {
        if(limit) {
            let productLimited = products.slice(0, limit);
            if(productLimited.length > 0) {
                return res.status(200).json({
                    success: true,
                    payload: productLimited
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: "Products not found"
                })
            }
        }else{
            return res.status(200).json({
                success: true,
                payload: products
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Products not found: " + error
        })
    }
});
server.get("/api/products/:pid", async (req, res) => {
    try {
        let {pid: id} = req.params;
        id = Number(id);
        console.log(id, "id");
        if(typeof id === "number" && id >= 0) {
            let product = (await manager.getProductById(id)).product;
            console.log(product);
            if(!product) return res.status(400).json({
                success: false,
                message: "Product not found"
            });
            return res.status(200).json({
                success: true,
                payload: product
            })

        }else{
            return res.status(400).json({
                success: false,
                message: "Check id data, it should be a number!"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Product not found: " + error
        })
    }
});
server.get("/api/carts",  async(req, res) => {
    try {
        let totalCarts = (await cart.getCarts()).carts;
        console.log(totalCarts);
        if(totalCarts.length > 0) {
            return res.status(200).json({
                success: true,
                response: totalCarts
            })
        }else {
            return res.status(400).json({
                success: false,
                message: "Carts not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cart not found: " + error
        })
    }
});

server.get("/api/carts/:cid", async (req, res) => {
    let {cid: id} = req.params;
    id = Number(id);
    try {
        if(id) {
            const obj = (await cart.getCartById(id)).cartId;
            res.status(200).json({
                success: true,
                response: obj
            })
        }else {
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cart not found: " + error
        })
    }
})