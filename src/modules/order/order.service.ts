import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../product/product.model";
import { ProductServices } from "../product/product.service";

const createOrder = async (payload: TOrder) => {
    const { productId, quantity } = payload;
    
    // Check if there is sufficient stock in inventory
    const product = await ProductServices.getProductById(productId);
    if (!product || product.inventory.quantity < quantity) {
        throw new Error("Insufficient stock");
    }

    // Reduce the quantity in inventory
    const updatedProduct = await ProductServices.updateProductInventory(productId, quantity);

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
