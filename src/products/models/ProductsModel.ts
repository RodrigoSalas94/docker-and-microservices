import mongoose, { Schema, Document } from 'mongoose';

interface Product extends Document {
  name: string;
  price: number;
  description: string;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
