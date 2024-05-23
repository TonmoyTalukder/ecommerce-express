import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

const searchProducts = async (searchTerm: string) => {
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
};

const updateProductInventory = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  product.inventory.quantity -= quantity;
  product.inventory.inStock = product.inventory.quantity > 0;

  await product.save();
  return product;
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
