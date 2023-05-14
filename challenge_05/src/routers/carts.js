import {Router} from "express";
import carts from "../classes/cart.js";
import manager from "../classes/products.js";

const router = Router();

//GETS
router.get("/", async (req, res) => {
    try {
        let totalCarts = (await carts.getCarts()).carts;
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

router.get("/:cid", async (req, res) => {
    let {cid: id} = req.params;
    id = Number(id);
    try {
        if(id) {
            const obj = (await carts.getCartById(id)).cartId;
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
});

//POSTS

router.post("/",  async (req, res) => {
    //Create an empty cart with no products
    try {
        let obj = (await carts.addCart()).cart;
        if(obj) {
            res.status(200).json({
                success: true,
                response: obj
            })
        }else {
            return res.status(400).json({
                success: false,
                message: "Cannot create cart"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot create cart: " + error
        })
    }
});

router.post("/:pid/:quantity", async (req, res) => {
    //Create cart with id product
    let {pid: id, quantity} = req.params;
    id = Number(id);
    quantity = Number(quantity);

    try {
        if(id && quantity) {
            let product = (await manager.getProductById(id)).product;
            console.log(product, 'product');
            if(product){
                console.log(product.id);
                let obj = await carts.addCart(product.id, quantity);
                console.log(obj, 'obj');
                return res.status(200).json({
                    success: true,
                    response: obj.cart
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: "Check product id!"
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "Check id or quantity data!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot create cart: " + error
        })
    }
});

//PUTS
router.put("/:cid/product/:pid/:units", async (req, res) => {
    let cid = req.params.cid ?? null;
    let pid = req.params.pid ?? null;
    let units = req.params.units ?? null;
    cid = Number(cid);
    pid = Number(pid);
    units = Number(units);
    try {
        if(cid && pid && units) {
            let product = (await manager.getProductById(pid)).product;
            let cartFound = (await carts.getCartById(cid)).cartId;
            if(cartFound && product) {
                let obj = await carts.updateCart(cid, pid, units);
                return res.status(200).json({
                    success: true,
                    response: obj.cart
                })
            }else {
                return res.status(400).json({
                    success: false,
                    message: "Cannot update cart"
                })
            }
        }else {
            return res.status(400).json({
                success: false,
                message: "Check data id!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot update cart: " + error
        })
    }
});

//DELETES
router.delete("/:cid/product/:pid/:units", async (req, res) => {
    let cid = req.params.cid ?? null;
    let pid = req.params.pid ?? null;
    let units = req.params.units ?? null;
    cid = Number(cid);
    pid = Number(pid);
    units = Number(units);
    try {
        if(cid && pid && units) {
            let product = (await manager.getProductById(pid)).product;
            let cartFound = (await carts.getCartById(cid)).cartId;
            if(cartFound && product) {
                let obj = await carts.deleteProductFromCart(cid, pid, units);
                return res.status(200).json({
                    success: true,
                    response: obj.cart
                })
            }else {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete  product from cart"
                })
            }
        }else {
            return res.status(400).json({
                success: false,
                message: "Check data id!"
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot delete cart: " + error
        })
    }
});

export default router;
