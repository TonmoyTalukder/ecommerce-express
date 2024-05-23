import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { ProductServices } from "../product/product.service";

const createOrder = async (payload: TOrder) => {
    const { productId, quantity } = payload;
    
    // Check if there is sufficient stock in inventory
    const product = await ProductServices.getProductById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }

    // Reduce the quantity in inventory
    await ProductServices.updateProductInventory(productId, quantity);

    // Create the order
    const result = await Order.create(payload);
    return result;
};

const getAllOrders = async () => {
    const result = await Order.find();
    return result;
};

const getOrdersByEmail = async (email: string) => {
    const result = await Order.find({ email });
    return result;
};

export const OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
