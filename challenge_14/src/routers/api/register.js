import { Router } from "express"
import manager from "../../classes/products";
import uploader from "../../middlewares/multer";

const router = Router()

router.post('/signup',uploader.single('file'), async(req,res,next)=> {
    try {
        if (!req.file) {
            return res.send('no se pudo cargar la imagen');
        }
        console.log(req.file);
        const data = req.body;
        let product = data;   //construyo el usuario
        product.url_photo = req.file.path  ;    //agrego la ruta de la foto
        await manager.addProduct(product);       //creo un usuario
        return res.json({                   //envio la respuesta
            status: 201,
            message: 'product created'
        });
    } catch(error) {
        next(error);
    }
})

export default router;