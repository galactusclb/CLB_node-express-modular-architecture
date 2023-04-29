import mongoose from 'mongoose';
import { Product } from './product.interface';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);