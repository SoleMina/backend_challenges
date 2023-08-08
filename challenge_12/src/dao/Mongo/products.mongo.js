import Product from "./models/Product.js";
 
class ProductDaoMongo {
    constructor() {
        this.productModel = Product;
    }

    getProducts = async(limit, page, title) => {
        try {
            if(title) {
                let data = await Product.paginate(
                    {title}, //objeto con queries para filtros
                    { limit, page} //limit y page de la paginacion
                );
                return data;

            }else{
                let data = await Product.paginate(
                    {}, //objeto con queries para filtros
                    { limit, page} //limit y page de la paginacion
                );
                return data;
            }
        } catch (error) {
            next(error);
        }
    };
    getProduct = async(pid) => {
        return await Product.findOne({_id: pid});
    };
    createProduct = async(newProduct) => {
        return await Product.create(newProduct);
    };
    updateProduct = async(pid, updProduct) => {
        return await Product.findByIdAndUpdate({_id: pid}, updProduct);
    };
    deleteProduct = async(pid) => {
        return await Product.findByIdAndDelete({_id: pid});
    }

}

export default ProductDaoMongo;