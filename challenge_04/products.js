const fs = require("fs");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async incrementId() {
        let id = 0;
        if(this.products.length === 0) {
            id = 1;
        }else {
            const lastProduct = this.products[this.products.length - 1];
            id = lastProduct.id + 1;
        }
        return id;
    }

    async addProduct(product) {
        //Check if file exists
        let file = fs.existsSync(this.path);
        try {
            if(file) {
                console.log(file, 'file');
                //If file existe read json
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
                console.log(this.products, "this.products");

                //Check if there are products with the same name
                let prod = this.products.find( pd => pd.title === product.title);

                if(prod) {
                    return {status: "error", message: "Product already exist"}
                }else{
                    try {
                        //Id increment
                        let id = await this.incrementId();

                        let dataObj = {
                            id: id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            thumbnail: product.thumbnail,
                            code: product.code,
                            stock: product.stock
                        }
                        this.products.push(dataObj);
                    
                        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                        return {status: "Success", product: dataObj, message: "Product created successfully!"}
                    } catch (error) {
                        return {status: "error", message: `Cannot create product here ${prod}`}
                    }

                }
            }else{
                //If file doesn't exist, create it

                try {
                    //Id increment
                    let id = await this.incrementId();

                    let dataObj = {
                        id: id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        stock: product.stock
                    }

                    await fs.promises.writeFile(this.path, JSON.stringify([dataObj], null, 2));
                    return {status: "success", product: dataObj, message: "Product created successfully!"}

                } catch (error) {
                    return {status: "error", message: "Cannot create product: " + error}
                }

            }
        } catch (error) {
            return {status: "error", message: "Cannot create product: " + error}
        }
    }
    async getProducts() {
        try {
            let products  = await fs.promises.readFile(this.path, "utf-8");
            if(!products) return {status: "error", message: "Products not found: " + error};

            this.products = JSON.parse(products);
            return {status: "success", products: this.products, message: "List of products"}

        } catch (error) {
            return {status: "error", message: "Products not found: " + error}
        }
    }
    async getProductById(id) {
        try {
            let products  = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(products);
            
            let product = this.products.find(prd => prd.id === id);
            if(!product) return {status: "error", message: "Product not found: " + error}

            return {status: "Success", product: product, message: "Product found successfully!"}
            
        } catch (error) {
            return {status: "error", message: "Product not found: " + error}
        }
    }
    async updateProduct(id, data) {
        try {
            let products  = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(products);

            let index = this.products.findIndex(prd => prd.id == id);
            console.log(this.products);

            if(index>=0) {
                this.products[index] = { id, ...data}
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                return {status: "Success", product: this.products[index], message: "Product updated successfully!"}
            }else{
                return {status: "error", message: "Product not found, can't update: " + error}
            }
            
        } catch (error) {
            return {status: "error", message: "Cannot update product: " + error}
        }
    }
    async deleteProduct(id) {
        try {
            let products  = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(products);

            let index = this.products.findIndex(prd => prd.id === id);
            if(index >=0) {
                this.products.splice(index, 1);
                console.log(this.products, "this.products inside delete");
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                return {status: "success", message: "Product has been deleted"}
            }else{
                return {status: "error", message: "Cannot delete product: " + error}
            }

        } catch (error) {
            return {status: "error", message: "Cannot delete product: " + error}
        }
    }
}

let manager = new ProductManager("./data/products.json");


// (async () => {
//     let product = new ProductManager("./data/products.json");

//     await product.addProduct({ title: 'Macbook', description: 'High quality', price: 4500, thumbnail: '', code: '000A1', stock: 10})
//       .then(result => {
//         console.log(result.message);
//     });
//     await product.addProduct({ title: 'Ipad', description: 'High quality', price: 4500, thumbnail: '', code: '000A1', stock: 10})
//       .then(result => {
//         console.log(result.message);
//     });
//     await product.getProducts().then(result => {
//         console.log(result.products);
//         console.log(result.message);
//     });
//     await product.getProductById(1).then(result => {
//         console.log(result.product);
//         console.log(result.message);
//     });
//     // await product.updateProduct(1, { title: 'Macbookcito', description: 'High quality', price: 4500, thumbnail: '', code: '000A1', stock: 10})
//     //   .then(result => {
//     //     console.log(result.message);
//     //     console.log(result.product);
//     // });
//     // await product.deleteProduct(2).then(result => {
//     //     console.log(result.message);
//     // });

// })();

module.exports = manager;