import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response)=>{
    const productData = req.body;
    const result = await ProductServices.createProduct(productData);

    res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
    });
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProducts();
  
      res.status(200).json({
        success: true,
        message: "Products are fetched successfully !",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Could not fetch products!",
        error: err,
      });
    }
  };

const getProductById = async (req: Request, res: Response) => {
    try {
        const {productID} = req.params;
      const result = await ProductServices.getProductById(productID);
  
      if (result) {
        res.status(200).json({
            success: true,
            message: "Movie by ID fetched successfully!",
            data: result,
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Movie not found!",
        });
    }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Could not fetch products!",
        error: err,
      });
    }
  };

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,

}