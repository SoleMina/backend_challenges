import {cartService} from "../service/index.js";

class CartViewController {
    constructor() {
        this.cartService = cartService;
    }

    getCart = async (req, res, next) => {
        console.log("FUNCIONAAAAA")
        try {
            const totalCarts = await this.cartService.getCart();
            
            if(totalCarts) {
                return res.render(
                    "carts", 
                    {
                      title: "Carts",
                      carts: totalCarts[0]
                    }
                  );
            }else{
                return res.status(404).json({
                    success: true,
                    message: `Not found`
                })
            }
        } catch (error) {
            next(error);
        }
    };
    getCartInformation = async (req, res, next) => {
        const cid = req.params.cid;
        try {
            const totalCarts = await this.getCartById(cid);
    
            if(totalCarts) {
                return res.status(200).json({
                    success: true,
                    response: totalCarts
                })
            }else{
                return res.status(404).json({
                    success: true,
                    message: `Not found`
                })
            }
        } catch (error) {
            next(error);
        }
    };
    getCartById = async (req, res, next) => {
        const cid = req.params.cid;
        try {
            const cart = await this.cartService.getCartById(cid);
            if(cart) {
                res.status(200).json({
                    success: true,
                    response: cart
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "Cart not found"
                })
            }
        } catch (error) {
            next(error);
        }
    };
    createCart = async (req, res, next) => {

        // const cart = await fetch("http://localhost:8080/api/carts", {
        //     method: "POST",
        //     body: JSON.stringify(req.body),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then((response) => response.json());

        const cart = req.body;
        
        console.log(cart, "cart");
        try {
            let obj = await this.cartService.createCart(cart.response);
            console.log(obj, "creando");
            if(obj) {
                res.status(200).json({
                    success: true,
                    response: obj
                })
            }else {
                return res.status(404).json({
                    success: false,
                    message: "Cannot create cart"
                })
            }
        } catch (error) {
            next(error);
        }
    };
    updateCart = async (req, res, next) => {
        try {
            pid = req.params.pid;
            cid = req.params.cid;
            body =req.body;
    
            let obj = await this.cartService.updateCart(pid, cid, body);
                if(obj) {
                    return res.status(200).json({
                        success: true,
                        response: obj
                    })
                }else{
                    return res.status(404).json({
                        success: false,
                        message: "Cannot update cart"
                    })
                }
        } catch (error) {
            next(error);
        }
    }
}

export default CartViewController;