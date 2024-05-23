import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { createOrderSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { error, value } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const orderData = value;
        const result = await OrderServices.createOrder(orderData);

        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (err: any) {
        if (err.message === "Insufficient quantity available in inventory") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Could not create order!",
            error: err.message,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getAllOrders();

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not fetch orders!",
            error: err.message,
        });
    }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email query parameter is required",
            });
        }

        const result = await OrderServices.getOrdersByEmail(email as string);

        res.status(200).json({
            success: true,
            message: `Orders fetched successfully for user email!`,
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not fetch orders!",
            error: err.message,
        });
    }
};

export const OrderControllers = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
