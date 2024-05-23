import express from 'express';
import { OrderControllers } from './order.controller';
import { createOrderSchema } from './order.validation';
import validate from '../../middleware/middleware.validation';

const router = express.Router();

router.post("/", validate(createOrderSchema), OrderControllers.createOrder);
router.get("/", OrderControllers.getAllOrders);
router.get("/by-email", OrderControllers.getOrdersByEmail);

export const OrderRoutes = router;
