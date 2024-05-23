import express from 'express';
import { ProductControllers } from './product.controller';
import { createProductSchema, updateProductSchema } from './product.validation';
import validate from '../../middleware/middleware.validation';

const router = express.Router();

router.post("/", validate(createProductSchema), ProductControllers.createProduct);
router.get("/:productID", ProductControllers.getProductById);
router.get("/", ProductControllers.getAllProducts);
router.put("/:productID", validate(updateProductSchema), ProductControllers.updateProduct);
router.delete("/:productID", ProductControllers.deleteProduct);

export const ProductRoutes = router;
