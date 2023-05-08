import multer from "multer";
import __dirname from "../../utils.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname === "image") {
            cb(null, "public/images");
        }else if (file.fieldname === "documents") {
            cb(null, "public/documents");
        }
    },
    filename: function(req, file, cb) {
        console.log(file);
        // cb(null, Date.now() + file.originalname);
        cb(null, Date.now() + file.fieldname + "." + file.mimetype.split("/")[1]);
    }
});
const upload = multer({storage: storage});

export default upload;

