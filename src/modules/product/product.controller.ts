import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { error, value } = createProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        
        const productData = value;
        const result = await ProductServices.createProduct(productData);

        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not create product!",
            error: err.message,
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;

        if (searchTerm) {
            const result = await ProductServices.searchProducts(searchTerm as string);
            return res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        } else {
            const result = await ProductServices.getAllProducts();
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
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

const getProductById = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        const result = await ProductServices.getProductById(productID);

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product by ID fetched successfully!",
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not fetch product!",
            error: err,
        });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { error, value } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { productID } = req.params;
        const productData = value;
        const result = await ProductServices.updateProduct(productID, productData);

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not update product!",
            error: err.message,
        });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        const result = await ProductServices.deleteProduct(productID);

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not delete product!",
            error: err,
        });
    }
};

const searchProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        const result = await ProductServices.searchProducts(searchTerm as string);

        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
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

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct, 
    deleteProduct,
    searchProducts,
};
