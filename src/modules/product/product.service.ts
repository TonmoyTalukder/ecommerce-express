import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
};

const getAllProducts = async () => {
    const result = await Product.find();
    return result;
};

const getProductById = async (id: string) => {
    try {
        const result = await Product.findById(id);
        return result;
    } catch (error) {
        throw new Error("Error fetching product by ID");
    }
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
    try {
        const result = await Product.findByIdAndUpdate(id, payload, { new: true });
        return result;
    } catch (error) {
        throw new Error("Error updating product");
    }
};

const deleteProduct = async (id: string) => {
    try {
        const result = await Product.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error("Error deleting product");
    }
};

const searchProducts = async (searchTerm: string) => {
    try {
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
        const result = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { tags: regex },
            ],
        });
        return result;
    } catch (error) {
        throw new Error("Error searching products");
    }
};

const updateProductInventory = async (productId: string, quantity: number) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // Update inventory quantity
        product.inventory.quantity -= quantity;

        // Update inStock status
        product.inventory.inStock = product.inventory.quantity > 0;

        // Save the updated product
        await product.save();

        return product;
    } catch (error) {
        throw new Error("Error updating product inventory");
    }
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct, 
    deleteProduct,
    searchProducts,
    updateProductInventory,
};
