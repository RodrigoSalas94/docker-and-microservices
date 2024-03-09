import { ProductRepository } from '../repositories/productsRepository';
import { Product } from '../types/Product';
const productRepository = new ProductRepository();

export class ProductServices {
  async addProduct(productData: Product): Promise<Product> {
    try {
      const newProduct = await productRepository.createProduct(productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  async getAllProduct(): Promise<Product[]> {
    try {
      return await productRepository.getAllProduct();
    } catch (error) {
      throw new Error(`Error featching products: ${error}`);
    }
  }
  async getProduct(productId: number): Promise<Product | null> {
    try {
      return await productRepository.getProduct(productId);
    } catch (error) {
      throw new Error(`Error featching product: ${error}`);
    }
  }

  async updateProduct(productId: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      return await productRepository.updateProduct(productId, productData);
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await productRepository.deleteProduct(productId);
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}
