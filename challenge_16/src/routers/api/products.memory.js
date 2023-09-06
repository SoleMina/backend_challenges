import { Router } from "express";
import manager from "../../dao/managers/products.js";
import upload from "../../middlewares/multer.js";

const router = Router();

//GETS
router.get("/", async (req, res) => {
  let limit = req.query.limit ?? null;
  let products = (await manager.getProducts()).products;
  try {
    if (limit) {
      let productLimited = products.slice(0, limit);
      if (productLimited.length > 0) {
        return res.status(200).json({
          success: true,
          response: productLimited,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Products not found",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        response: products,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Products not found: " + error,
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    let { pid: id } = req.params;
    id = Number(id);
    if (typeof id === "number" && id >= 0) {
      let product = (await manager.getProductById(id)).product;
      console.log(product);
      if (!product)
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      return res.status(200).json({
        success: true,
        response: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Check id data, it should be a number!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Product not found: " + error,
    });
  }
});

//POSTS
router.post("/", upload.single("imageFile"), async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);

    console.log(upload);
    console.log(req.file, "req.file");

    let thumbnail = "http://localhost:8000/public/images/" + req.filename;
    body.thumbnail = thumbnail;
    console.log("body", body);

    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Cannot create product",
      });
    }
    const product = (await manager.addProduct(body)).product;
    console.log(product);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Cannot create product",
      });
    }
    return res.status(200).json({
      success: true,
      response: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot create product: " + error,
    });
  }
});

//PUTS
router.put("/:pid", async (req, res) => {
  try {
    let id = req.params.pid ?? null;
    let body = req.body;
    id = Number(id);
    console.log(id);
    console.log(body);
    if (typeof id === "number" && id > 0) {
      let product = (await manager.updateProduct(id, body)).product;
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Cannot update product",
        });
      }
      return res.status(200).json({
        success: true,
        response: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Check data id!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update product: " + error,
    });
  }
});

//DELETES
router.delete("/:pid", async (req, res) => {
  try {
    let { pid: id } = req.params;
    id = Number(id);
    if (typeof id === "number" && id > 0) {
      let result = await manager.deleteProduct(id);
      if (result.status === "success") {
        return res.status(200).json({
          success: true,
          message: "Product has been deleted",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Cannot delete product!",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Check data id!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot delete product: " + error,
    });
  }
});
export default router;
