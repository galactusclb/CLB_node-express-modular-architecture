import mongoose from "mongoose";

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    sku?: number;
    createdAt?: Date;
    updatedAt?: Date;
}