class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        let id = 0;
        if(this.products.length === 0) {
            id = 1;
        }else {
            let lastProduct = this.products[this.products.length - 1];
            id = lastProduct.id + 1;
        }
        let existingProduct = (this.products.find(product => product.code == code));
        
        if(existingProduct) {
            console.log("You cannot create a product with an existing code");
        }else{
            let product = { id, title, description, price, thumbnail, code, stock}
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

    //     let existingProduct = (this.products.find(product => product.code == code));
        
    //     if(existingProduct) {
    //         console.log("You cannot create a product with an existing code");
    //     }else{
    //         let product = { id, ...item };
    //         console.log(product, 'product');
    //         this.products.push(product);
    //     }
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

product.addProduct({ title: 'Iphone', description: 'High quality', price: 4500, thumbnail: '', code: '000A1', stock: 10})
product.addProduct({ title: 'Macbook', description: 'High quality', price: 7500, thumbnail: '', code: '000A2', stock: 20})
product.addProduct({ title: 'Ipad', description: 'High quality', price: 3500, thumbnail: '', code: '000A3', stock: 5})

console.log(product.getProducts());
console.log("--------------------");
console.log(product.getProductById(2));
