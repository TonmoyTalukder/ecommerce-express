import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const result = await OrderServices.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Could not create order!',
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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
        message: 'Could not fetch orders!',
      });
    }
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    if (typeof email !== 'string') {
      throw new Error('Invalid email parameter');
    }
    const result = await OrderServices.getOrdersByEmail(email);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
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
        message: 'Could not fetch orders!',
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
