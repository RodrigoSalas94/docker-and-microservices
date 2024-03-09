import { ProductModel } from '../models/ProductsModel';
import { Product } from '../types/Product';

export class ProductRepository {
  async createProduct(ProductData: Product): Promise<Product> {
    try {
      const newProduct = new ProductModel(ProductData);
      return await newProduct.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  async getAllProduct(): Promise<Product[]> {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }

  async getProduct(productId: number): Promise<Product | null> {
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      throw new Error(`Error fetching product: ${error}`);
    }
  }

  async updateProduct(productId: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      return await ProductModel.findByIdAndUpdate(productId, productData);
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}
