import { ProductController } from '../controllers/productsControllers';
import express from 'express';
import { authenticateToken } from '../../middleware/authMiddleware';

const productRouter = express.Router();
const productControllers = new ProductController();

productRouter.post('/products/add', authenticateToken, productControllers.addProduct);
productRouter.get('/products/:id', productControllers.getProduct);
productRouter.get('/products/getall', productControllers.getAllProduct);
productRouter.put('/products/update/:id', authenticateToken, productControllers.updateProduct);
productRouter.put('/products/delete/:id', authenticateToken, productControllers.deleteProduct);

export default productRouter;
