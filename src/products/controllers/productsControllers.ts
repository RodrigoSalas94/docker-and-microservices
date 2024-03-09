import { ProductServices } from '../services/productServices';
import { Product } from '../types/Product';
import { Request, Response, NextFunction } from 'express';
import error from 'console';

const productServices = new ProductServices();

export class ProductController {
  async addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: Product = req.body;

      const newProduct: Product = await productServices.addProduct(productData);

      res.status(201).json(newProduct);
    } catch (error) {
      console.error(`Error creating product: ${error}`);
      return next(error);
    }
  }

  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products: Product[] = await productServices.getAllProduct();
      res.status(200).json(products);
    } catch (error) {
      console.error(`Error featching products: ${error}`);
      return next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId: number = +req.params.productId;
      const product: Product | null = await productServices.getProduct(productId);

      if (!product) {
        return next(error);
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(`Error featching product: ${error}`);
      return next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId: number = +req.params.productId;

      const productData: Partial<Product> = req.body;

      const updatedProduct: Product | null = await productServices.updateProduct(productId, productData);

      if (!updatedProduct) {
        return next(error);
      } else {
        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      console.error(`Error updating product: ${error}`);
      return next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId: number = +req.params.productId;

      await productServices.deleteProduct(productId);

      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting product: ${error}`);
      return next(error);
    }
  }
}
