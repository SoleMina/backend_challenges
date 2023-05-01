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
                    pid,
                    quantity
                }
                this.cart.push(dataObj);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
                return {status: "Success", message: "Cart created successfully!"}
            }else{
                try {
                    //Id increment
                    let id = await this.incrementId();

                    let dataObj = {
                        id,
                        pid,
                        quantity
                    }

                    await fs.promises.writeFile(this.path, JSON.stringify([dataObj], null, 2));
                    return {status: "success", message: "Cart created successfully!"}

                } catch (error) {
                    return {status: "error", message: "Cannot create cart: " + error}
                }
            }
        }catch(error){
            return {status: "error", message: "Cannot add cart " + error}
        }
    }
}

// let cart = new CartManager("./data/cart.json");

(async () => {
    let cart = new CartManager("./data/cart.json");

    await cart.addCart(2, 5)
      .then(result => {
        console.log(result.message);
    });

})();
