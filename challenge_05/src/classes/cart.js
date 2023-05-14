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
            if(obj) {
                let index = obj.products.findIndex((product) => product.pid === pid);
                if(index < 0) {
                    let product = {
                        pid,
                        quantity: units
                    }
                    let totalProducts  = await fs.promises.readFile("./data/products.json", "utf-8");
                    totalProducts = JSON.parse(totalProducts);
                    indexProduct = totalProducts.findIndex((product) => product.id === pid);
                    let stock = totalProducts[indexProduct].stock;

                    if(stock >= units) {
                        totalProducts[indexProduct].stock = stock - units;
                        obj.products.push(product);
                        await fs.promises.writeFile("./data/products.json", JSON.stringify(totalProducts, null, 2));
                        await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                        return {status: "Success", cart: obj, message: "Cart updated successfully!"}
                    }
                }
                let totalProducts  = await fs.promises.readFile("./data/products.json", "utf-8");
                totalProducts = JSON.parse(totalProducts);
                console.log(totalProducts, "totalProducts");

                let indexProduct = totalProducts.findIndex((product) => product.id === pid);
                let stock = totalProducts[indexProduct].stock;
                console.log(stock, "stock");

                if(stock >= units) {
                    totalProducts[indexProduct].stock = stock - units;
                    console.log(totalProducts, "totalProducts 2");
                    obj.products[index].pid = pid;
                    obj.products[index].quantity = units;
                    await fs.promises.writeFile("./data/products.json", JSON.stringify(totalProducts, null, 2));
                    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                    return {status: "Success", cart: obj, message: "Cart updated successfully!"}
                }
            }
            return {status: "Error", message: "Cannot update cart"}
            
        } catch (error) {
            return {status: "Error", message: "Cannot update cart: " + error}
        }
    }
    async deleteProductFromCart(cid, pid, units) {
        try {
            this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            let obj = this.cart.find(ob => ob.id === cid);
            if(obj) {
                let index = obj.products.findIndex((product) => product.pid === pid);
                if(index >= 0) {
                    let totalProducts  = await fs.promises.readFile("./data/products.json", "utf-8");
                    totalProducts = JSON.parse(totalProducts);

                    let indexProduct = totalProducts.findIndex((product) => product.id === pid);
                    let stock = totalProducts[indexProduct].stock;
                    console.log(stock, "stock");

                    if(stock >= units) {
                        totalProducts[indexProduct].stock = stock + units;
                        obj.products = await obj.products.filter((product) => product.pid !== pid);
                        await fs.promises.writeFile("./data/products.json", JSON.stringify(totalProducts, null, 2));
                        await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                        return {status: "Success", cart: obj, message: "Product deleted from cart successfully!"}
                    }
                }
                return {status: "Error", message: "Cannot delete product from cart"}
            }
            
        } catch (error) {
            return {status: "Error", message: "Cannot delete product from cart: " + error}
        }
    }
}

let cart = new CartManager("./src/data/cart.json");

module.exports = cart;