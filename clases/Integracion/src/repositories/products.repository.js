class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts() {
        return this.dao.get();
    }
    getProduct(pid) {
        return this.dao.getBy(pid);
    }
    createProduct(newProduct) {
        return this.dao.create(newProduct);
    }
    updateProduct(pid, product) {
        return this.dao.update(pid, product);
    }
    deleteProduct(pid) {
        return this.dao.delete();
    }

}

export default ProductRepository;