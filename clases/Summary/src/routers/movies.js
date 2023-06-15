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
    let skip = 1; //req.query.skip;
    if(req.query.skip) {skip = req.query.skip}

    let limit = req.query.limit ?? 5;
    let page = req.query.page ?? 1;
    let title = req.query.title ? new RegExp(req.query.title, "i") : '';

    try {
        // let all = await Movie.find()
        //     .skip(skip)
        //     .limit(limit);
        let all = await Movie.paginate(
            {title}, //objeto con queries para filtros
            { limit, page} //limit y page de la paginacion
        )
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
router.get("/query-stats", async(req, res, next) => {
    try {
        let quantity =  await Movie.find({ price: {$gt: 40}});
        let stats = await Movie.find({ price: {$gt: 40}}).explain("executionStats");
        console.log(stats);
        return res.status(200).json({
            success: true,
            quantity: quantity.length,
            time: stats.executionStats.executionTimeMillis
        })
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