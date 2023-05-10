const fs = require("fs");

class CartManager {
    constructor(path) {
        this.path = path;
        this.cart = [];
    }

    async incrementId() {
        let id = 0;
        if(this.cart.length === 0) {
            id = 1;
        }else {
            const lastProduct = this.cart[this.cart.length - 1];
            id = lastProduct.id + 1;
        }
        return id;
    }

    async addCart(pid, quantity) {
        //Check if file exists
        let file = fs.existsSync(this.path);
        try {
            if(file) {
                //If file existe read json
                this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
                //Id increment
                let id = await this.incrementId();
                let dataObj = {
                    id,
                    products: []
                }
                if(id && quantity) {
                    dataObj.products.push({pid, quantity});
                    this.cart.push(dataObj);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                    return {status: "Success", cart: dataObj, message: "Cart created successfully!"}
                }else{
                    this.cart.push(dataObj);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                    return {status: "Success", cart: dataObj, message: "Cart created successfully!"}
                }
            }else{
                try {
                    //Id increment
                    let id = await this.incrementId();

                    let dataObj = {
                        id,
                        products: []
                    }
                    dataObj.products.push({pid, quantity});
                    await fs.promises.writeFile(this.path, JSON.stringify([dataObj], null, 2));
                    return {status: "success", cart: dataObj, message: "Cart created successfully!"}

                } catch (error) {
                    return {status: "error", message: "Cannot create cart: " + error}
                }
            }
        }catch(error){
            return {status: "error", message: "Cannot add cart " + error}
        }
    }
    async getCarts() {
        try {
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            if(this.cart.length>0) {
                return {status: "Success", carts: this.cart, message: "Carts found successfully!"}
            }
            return {status: "Error", message: "Not found"}
        } catch (error) {
            return {status: "Error", message: "Not found: " + error}
        }
    }
    async getCartById(id) {
        try {
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            let obj = this.cart.find(ob => ob.id === id);
            if(obj) {
                return {status: "Success", cartId: obj, message: "Cart found successfully!"}
            }
            return {status: "Error", message: "Not found"}
        } catch (error) {
            return {status: "Error", message: "Not found: " + error}
        }
    }
    async updateCart(cid, pid, units) {
        try {
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            let obj = this.cart.find(ob => ob.id === cid);
            console.log(obj, "object update");
            if(obj) {
                let index = obj.products.findIndex((product) => product.pid === pid);
                console.log(index, "index");
                if(index < 0) {
                    let product = {
                        pid,
                        quantity: units
                    }
                    obj.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                    return {status: "Success", cart: obj, message: "Cart updated successfully!"}
                }
                obj.products[index].pid = pid;
                obj.products[index].quantity = units;
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                return {status: "Success", cart: obj, message: "Cart updated successfully!"}
            }
            return {status: "Error", message: "Cannot update cart"}
            
        } catch (error) {
            return {status: "Error", message: "Cannot update cart: " + error}
        }
    }
}

let cart = new CartManager("./data/cart.json");

// (async () => {
//     let cart = new CartManager("./data/cart.json");

//     await cart.addCart(2, 5)
//       .then(result => {
//         console.log(result.message);
//         console.log(result.cart);
//     });

// })();
module.exports = cart;