import mongoose from 'mongoose';

import { Product } from './product.interface';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "unlisted" },
    description: { type: String },
    sku: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret?._doc?.__v;
            return ret?._doc;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret?._doc?.__v;
            return ret?._doc;
        }
    },
});

// ProductSchema.path('__v', {
//     type: Number,
//     select: false
// });

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);