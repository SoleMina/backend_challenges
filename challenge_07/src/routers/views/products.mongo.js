import { Router} from "express";
import Product from "../../models/Product.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.get("/", async(req, res, next) => {
    let id = req.query.pid ?? null;
    let limit = req.query.limit ?? 5;
    let page = req.query.page ?? 1;
    let title = req.query.title && new RegExp(req.query.title, "i");

    try {
        if(title) {
            //let products = await Product.find().lean();
            let products = await Product.paginate(
                {title}, //objeto con queries para filtros
                { limit, page} //limit y page de la paginacion
            );
            if(products) {
                return res.render(
                    "products", 
                    {
                    title: "Products",
                    products: products,
                    script: "public/js/pagination.js",
                    styles: "public/css/styles.css",
                    page: page,
                    }
                );
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Not found`
                })
            }
        }else {
            //let products = await Product.find().lean();
        let products = await Product.paginate(
            {}, //objeto con queries para filtros
            { limit, page} //limit y page de la paginacion
        );
        console.log(typeof products);
        if(products) {
            return res.render(
                "products", 
                {
                  title: "Products",
                  products: products,
                  script: "public/js/pagination.js",
                  styles: "public/css/styles.css",
                  page: page,
                }
            );
        }else{
            return res.status(404).json({
                success: false,
                message: `Not found`
            })
        }
        }

    } catch (error) {
        next(error);
    }
});
router.get("/:pid", async(req, res, next) => {
    try {
        let {pid: id} = req.params;
        console.log(id, "pid");
        let one = await Product.findById(id);
        console.log(one, "one");
        if(one) {
            let {title, description, code, price, thumbnail, stock} = one;
            return res.render(
                "product", 
                {
                    title,
                    description, 
                    code, 
                    price,
                    thumbnail,
                    stock,
                    styles: "../public/css/styles.css",
                    script: "../public/js/index.js"
                },
            );

        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.post("/", upload.single("imageFile"), async(req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        console.log(req.file, "req.file");
        let thumbnail = "http://localhost:8080/public/images/" + req.file.filename;
        body.thumbnail = thumbnail;
        let response = await Product.create(body);
        console.log(response, "response");
        if(response) {
            let products = await Product.find().lean();

            return res.render(
                "products", 
                {
                  title: "Products",
                  products: products,
                  script: "public/js/index.js",
                  styles: "public/css/styles.css",
                }
            );
        }else {
            return res.status(404).json({
                success: false,
                message: `Couldn't create product!`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.put("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndUpdate(req.params.pid, req.body, {new:true});
        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product updated!`,
                response: response
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.delete("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndDelete(req.params.pid);

        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product updated!`,
                response: response
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
        
    } catch (error) {
        next(error);
    }
});

export default router;