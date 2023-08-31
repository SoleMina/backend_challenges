import multer from 'multer';
import __dirname from '../utils.js';
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})
const upload = multer({storage:storage});

export default upload;