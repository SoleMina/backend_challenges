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

        let product = { id, title, description, price, thumbnail, stock}
        this.products.push(product);
    }
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

console.log(product.getProducts());
console.log("--------------------");
console.log(product.getProductById(3));
