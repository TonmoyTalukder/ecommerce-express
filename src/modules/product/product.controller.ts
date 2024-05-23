import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  try {
    const result = await ProductServices.createProduct(productData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not create product!',
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let result;

    if (searchTerm && typeof searchTerm === 'string') {
      result = await ProductServices.searchProducts(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      result = await ProductServices.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not fetch products!',
      });
    }
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const result = await ProductServices.getProductById(productID);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product by ID fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not fetch product!',
      });
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const productData = req.body;
    const result = await ProductServices.updateProduct(productID, productData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not update product!',
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const result = await ProductServices.deleteProduct(productID);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not delete product!',
      });
    }
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (typeof searchTerm !== 'string') {
      throw new Error('Invalid search term');
    }
    const result = await ProductServices.searchProducts(searchTerm);

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not fetch products!',
      });
    }
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
