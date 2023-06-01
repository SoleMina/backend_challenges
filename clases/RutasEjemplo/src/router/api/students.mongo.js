import { Router} from "express";
import Student from "../../models/students.model.js";

const router = Router();

router.post("/", async(req, res, next) => {
    try {
        let one = await Student.create(req.body);
        if(one) {{
            return res.json({
                status: 201,
                message: "Student created",
                one: one._id
            })
        }}
    } catch (error) {
        next(error);
    }
});
router.get("/", async(req, res , next) => {
    try {
        let all = await Student.find();
        // let all = await Student.find().select("name age - _id");
        if(all) {
            return res.json({
                status: 200,
                response: all
            })
        }
        
    } catch (error) {
        next(error);
    }
});
router.put("/:sid", async(req, res, next) => {
    try {
       let one =  await Student.findByIdAndUpdate(req.params.sid, req.body);
       if(one) {
        return res.json({
            status: 200,
            message: "updated!"
        })
       }
    } catch (error) {
        next(error);
    }
});
router.delete("/:sid", async(req, res, next) => {
    try {
        let one = await Student.findByIdAndDelete(req.params.sid);
        if(one) {
            return res.json({
                status: 200,
                message: "deleted"
            })
        }
    } catch (error) {
        
    }
});

export default router;