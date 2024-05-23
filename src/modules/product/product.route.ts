import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/:productID", ProductControllers.getProductById);
router.get("/", ProductControllers.getAllProducts);
router.put("/:productID", ProductControllers.updateProduct);
router.delete("/:productID", ProductControllers.deleteProduct);
router.get("/", ProductControllers.searchProducts);

export const ProductRoutes = router;