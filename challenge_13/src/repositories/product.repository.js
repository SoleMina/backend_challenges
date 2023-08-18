class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getProducts = async () => {
        let result = await this.dao.get();
        return result;
    }
    getProduct = async (pid) => {
        let result = await this.dao.getById();
        return result;
    }
    createProduct = async () => {
        let result = await this.dao.create();
        return result;
    }
    updateProduct = async (pid, updateToProduct) => {
        let result = await this.dao.update(pid, updateToProduct);
        return result;
    }
    deleteProduct = async (pid) => {
        let result = await this.dao.delete(pid);
        return result;
    }
}

export default ProductRepository;