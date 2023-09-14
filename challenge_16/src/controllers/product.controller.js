import { productService } from "../service/index.js";
import CustomError from "../utils/error/customError.js";
import { EErrors } from "../utils/error/enum.js";

class ProductController {
  constructor() {
    this.productService = productService;
  }

  getProducts = async (req, res, next) => {
    let limit = req.query.limit ?? 6;
    let page = req.query.page ?? 1;
    let title = req.query.title && new RegExp(req.query.title, "i");

    try {
      const data = await this.productService.getProducts(limit, page, title);
      if (data) {
        console.log(data);
        return res.status(200).json({
          success: true,
          products: data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Not found`,
        });
      }
    } catch (error) {
      return res.status(200).json({
        success: true,
        products: docs,
      });
    }
  };
  getProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      let product = await this.productService.getProduct(pid);
      if (product) {
        return res.status(200).json({
          success: true,
          payload: product,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  createProduct = async (req, res, next) => {
    const newProduct = req.body;
    let thumbnail = "http://localhost:8080/public/images/" + req.file.filename;
    newProduct.thumbnail = thumbnail;

    try {
      const { title, description, price, code, stock } = newProduct;
      if (!title || !description || !price || !code || !stock) {
        CustomError.createError({
          name: "Product Creation error",
          cause: generateProductErrorsInfo({ title, description, code }),
          message: "Error trying to create product",
          code: EErrors.INVALID_TYPE_ERROR,
        });
      }

      let response = await this.productService.createProduct(newProduct);

      if (response) {
        return res.status(200).json({
          success: true,
          message: `Product created!`,
          payload: response,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Couldn't create product!`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  updateProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      let response = await this.productService.updateProduct(pid, req.body);
      if (response) {
        return res.status(200).json({
          success: true,
          message: `Product updated!`,
          response: response,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      let response = await this.productService.deleteProduct(pid);

      if (response) {
        return res.status(200).json({
          success: true,
          message: `Product deleted!`,
          response: response,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
