import { Router } from "express";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { Types } from "mongoose";

let router = Router();


//CREATE
router.post('/',async(req,res,next)=> {
    try {
        let one = await Cart.create(req.body)
        return res.status(201).json({
            succes:true,
            message: 'id= '+one._id
        })
    } catch (error) {
        next(error)
    }
})

router.get("/", async(req, res, next) => {
    try {
        let all = await Cart.find().select("user_id movie_id - _id")
        .populate("user_id", "name - _id")
        .populate("movie_id", "title - _id");
        if(all) {
            return res.status(200).json({
                success: true,
                response: all
            });
        }else{
            return res.status(404).json({
                success: false,
                message: `Error not found`
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/users/:uid", async(req, res, next) => {
    try {
        const uid = req.params.uid;
        
        let all = await Cart.find({ user_id: uid}).select("user_id movie_id - _id");
        //configurar condicional si all no existe
        return res.status(200).json({
            success: true,
            response: all
        });
    } catch (error) {
        next(error);
    }
});

//Update Carts
router.put("/:cid", async(req, res, next) => {
    try {
        const cid = req.params.cid;
        const data = req.body;
        const one = await Cart.findByIdAndUpdate(
            cid, //id del documento a modificar
            data, //objeto con las modificaciones a realizar
            {new: true}
        ).populate("user_id", "name - _id");

        return res.status(200).json({
            success: true,
            response: one
        });

    } catch (error) {
        next(error);
    }
});

//Update cart from one user
router.put("/users/:uid", async(req, res, next) => {
    try {
        const uid = req.params.uid;
        const all = await Cart.updateMany({user_id: uid}, {active: false});
        //updateMany
        return res.status(200).json({
            success: true,
            response: all
        });
    } catch (error) {
        next(error);
    }
});

//DESTROY
router.delete("/:cid", async(req, res, next) => {
    try {
        const cid = req.params.cid;
        //let one = await Cart.deleteOne({ _id: cid});
        let one = await Cart.findByIdAndDelete(cid);
        return res.status(200).json({
            success: true,
            message: `Deleted!`,
            response: one
        })

    } catch (error) {
        next(error);
    }
});
// router.get("/bills", async(req, res, next) => {
//     try {
//         let all = await Cart.find();

//         if(all) {
//             return res.status(200).json({
//                 success: true,
//                 response: all
//             })
//         }else{
//             return res.status(404).json({
//                 success: true,
//                 message: `Not found`
//             })
//         }
//     } catch (error) {
//         next(error);
//     }
// });

router.get("/bills/:uid", async(req, res, next) => {
    try {
        const uid = req.params.uid;
        let all = await Cart.aggregate([
            { $match: {user_id: new Types.ObjectId(uid) }}, //filtro carritos por usuario
            { $lookup: { foreignField: "_id", from: "users", localField: "user_id", as: "user_id"}}, //populeo los datos del usuario
            { $lookup: { foreignField: "_id", from: "movies", localField: "movie_id", as: "movie_id" }},
            //Move capacity and price to top so we can multiple and use it
            { $replaceRoot: { //reemplazo la ubicacion de los elementos del array populado
                newRoot: {
                    $mergeObjects: [
                        { $arrayElemAt: [ "$movie_id", 0]},
                        "$$ROOT"
                    ]
                }
            }},
            { $set: { total: { $multiply: ["$quantity", "$price"] }}}, //multiplicar precio x cantidad
            //0 = false, 1 = true
            { $project: { movie_id: 0, quantity: 0, price: 0, __v: 0, capacity: 0}}, //limpia el objeto
            { $group: {_id: "$user_id", sum: { $sum: "$total"}}}, //agrupo y reduzco
            { $project: {_id: 0, user_id: "$_id", sum: "$sum"}},
            //{ $merge: { into: "bills"}}
        ]);

        if(all) {
            return res.status(200).json({
                success: true,
                response: all
            })
        }else{
            return res.status(404).json({
                success: true,
                message: `Not found`
            })
        }
    } catch (error) {
        next(error);
    }
});

export default router;