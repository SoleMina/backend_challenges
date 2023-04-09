class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, stock }) {
        let id = 0;
        if(this.products.length === 0) {
            id = 1;
        }else {
            let lastProduct = this.products[this.products.length - 1];
            id = lastProduct.id + 1;
        }
        let existingProduct = (this.products.find(product => product.title == title));
        
        if(existingProduct) {
            console.log("You cannot create an existing product");
        }else{
            let product = { id, title, description, price, thumbnail, stock}
            this.products.push(product);
        }
    }

    // addProduct(item) {
    //     let id = 0;
    //     if(this.products.length === 0) {
    //         id = 1;
    //     }else {
    //         let lastProduct = this.products[this.products.length - 1];
    //         id = lastProduct.id + 1;
    //     }

    //     let product = { id, ...item };
    //     console.log(product, 'product');
    //     this.products.push(product);
    // }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
        let productFound = this.products.find(product => product.id == id );
        if(productFound) {
            return productFound;
        }else {
            console.log("Not found");
        }
    }
}

let product = new ProductManager();

product.addProduct({ title: 'Iphone', description: 'High quality', price: 4500, thumbnail: '', stock: 10})
product.addProduct({ title: 'Macbook', description: 'High quality', price: 7500, thumbnail: '', stock: 20})
product.addProduct({ title: 'Ipad', description: 'High quality', price: 3500, thumbnail: '', stock: 5})

console.log(product.getProducts());
console.log("--------------------");
console.log(product.getProductById(3));
