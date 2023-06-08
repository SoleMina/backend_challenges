import { Router } from "express";
import Movie from "../models/Movie.js";

let router = Router();

router.post("/", async(req, res, next) => {
    try {
        let one = await Movie.create(req.body);
        return res.status(201).json({
            success: true,
            message: `Movie id=${one._id} created`
        })
    } catch (error) {
        next(error);
    }
});

router.get("/", async(req, res, next) => {
    try {
        let all = await Movie.find();
        if(all) {
            return res.status(200).json({
                success: true,
                data: all
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
router.put("/:id", async(req, res, next) => {
    try {
        let one = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(one) {
            return res.status(200).json({
                success: true,
                data: one
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
router.delete("/:id", async(req, res, next) => {
    try {
        let one = await Movie.findByIdAndDelete(req.params.id);
        if(one) {
            return res.status(200).json({
                success: true,
                message: `Movie deleted!`
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
})

export default router;