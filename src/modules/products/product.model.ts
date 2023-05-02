import mongoose from 'mongoose';

import { Product } from './product.interface';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "unlisted" },
    description: { type: String },
    sku: { type: Number, default: 0 },
}, {
    timestamps: true
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);