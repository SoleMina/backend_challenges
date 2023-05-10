const express = require("express");
const server = express();
const PORT = process.env.PORT || 8000;

// const manager = require("./products");
// const cart = require("./cart");
const productsRouter = require("./routers/products");
const cartsRouter = require("./routers/carts");

server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);

// CARTS
// server.get("/api/carts",  async(req, res) => {
//     try {
//         let totalCarts = (await cart.getCarts()).carts;
//         console.log(totalCarts);
//         if(totalCarts.length > 0) {
//             return res.status(200).json({
//                 success: true,
//                 response: totalCarts
//             })
//         }else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Carts not found"
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cart not found: " + error
//         })
//     }
// });

// server.get("/api/carts/:cid", async (req, res) => {
//     let {cid: id} = req.params;
//     id = Number(id);
//     try {
//         if(id) {
//             const obj = (await cart.getCartById(id)).cartId;
//             res.status(200).json({
//                 success: true,
//                 response: obj
//             })
//         }else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Cart not found"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cart not found: " + error
//         })
//     }
// });

//Create an empty cart with no products
// server.post("/api/carts", async (req, res) => {
//     try {
//         let obj = (await cart.addCart()).cart;
//         if(obj) {
//             res.status(200).json({
//                 success: true,
//                 response: obj
//             })
//         }else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Cannot create cart"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cannot create cart: " + error
//         })
//     }
// });

//Create cart with id product
// server.post("/api/carts/:pid/:quantity", async (req, res) => {
//     let {pid: id, quantity} = req.params;
//     id = Number(id);
//     quantity = Number(quantity);

//     try {
//         if(id && quantity) {
//             let product = (await manager.getProductById(id)).product;
//             console.log(product, 'product');
//             if(product){
//                 console.log(product.id);
//                 let obj = await cart.addCart(product.id, quantity);
//                 console.log(obj, 'obj');
//                 return res.status(200).json({
//                     success: true,
//                     response: obj.cart
//                 })
//             }else{
//                 return res.status(400).json({
//                     success: false,
//                     message: "Check product id!"
//                 })
//             }
//         }else{
//             return res.status(400).json({
//                 success: false,
//                 message: "Check id or quantity data!"
//             })
//         }
        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cannot create cart: " + error
//         })
//     }
// });

// server.put("/api/carts/:cid/product/:pid/:units", async (req, res) => {
//     let cid = req.params.cid ?? null;
//     let pid = req.params.pid ?? null;
//     let units = req.params.units ?? null;
//     cid = Number(cid);
//     pid = Number(pid);
//     units = Number(units);
//     try {
//         if(cid && pid && units) {
//             let product = (await manager.getProductById(pid)).product;
//             let cartFound = (await cart.getCartById(cid)).cartId;
//             if(cartFound && product) {
//                 let obj = await cart.updateCart(cid, pid, units);
//                 return res.status(200).json({
//                     success: true,
//                     response: obj.cart
//                 })
//             }else {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Cannot update cart"
//                 })
//             }
//         }else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Check data id!"
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cannot update cart: " + error
//         })
//     }
// });


// server.delete("/api/carts/:cid/product/:pid/:units", async (req, res) => {
//     let cid = req.params.cid ?? null;
//     let pid = req.params.pid ?? null;
//     let units = req.params.units ?? null;
//     cid = Number(cid);
//     pid = Number(pid);
//     units = Number(units);
//     try {
//         if(cid && pid && units) {
//             let product = (await manager.getProductById(pid)).product;
//             let cartFound = (await cart.getCartById(cid)).cartId;
//             if(cartFound && product) {
//                 let obj = await cart.deleteProductFromCart(cid, pid, units);
//                 return res.status(200).json({
//                     success: true,
//                     response: obj.cart
//                 })
//             }else {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Cannot delete  product from cart"
//                 })
//             }
//         }else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Check data id!"
//             });
//         }
        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Cannot delete cart: " + error
//         })
//     }
// });