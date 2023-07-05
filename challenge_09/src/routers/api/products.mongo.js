import { Router} from "express";
import Product from "../../models/Product.js";
import upload from "../../middlewares/multer.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", isAdmin, async(req, res, next) => {
    let limit = req.query.limit ?? 6;
    let page = req.query.page ?? 1;
    let title = req.query.title ? new RegExp(req.query.title, "i") : '';
    try {
        //let products = new Product.find();
        let data = await Product.paginate(
            {}, //objeto con queries para filtros
            { limit, page} //limit y page de la paginacion
        );

        if(data) {
            return res.status(200).json({
                success: true,
                products: data
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.get("/:pid", async(req, res, next) => {
    try {
        let one = await Product.findById(req.params.pid);
        if(one) {
            return res.status(200).json({
                success: true,
                product: one
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
router.post("/", upload.single("imageFile"), async(req, res, next) => {
    const body = req.body;
    console.log(body);
    console.log(req.file, "req.file");
    let thumbnail = "http://localhost:8080/public/images/" + body.thumbnail;
    body.thumbnail = thumbnail;

    try {
        let response = await Product.create(body);
        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product created!`
            })
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