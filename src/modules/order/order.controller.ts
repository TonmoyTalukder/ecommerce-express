import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const result = await OrderServices.createOrder(orderData);

        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not create order!",
            error: err,
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
            error: err,
        });
    }
};

export const OrderControllers = {
    createOrder,
    getAllOrders,
};
