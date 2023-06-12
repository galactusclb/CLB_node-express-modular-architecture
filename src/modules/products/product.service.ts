import { ConflictError, NotFoundError } from "utils/api-errors";
import { ProductModel } from "./product.model";
import { Product } from "./product.interface";
import { Document } from "mongoose";


export const doCreateProduct = async (payload: Product): Promise<Product> => {
    const hasProduct = await ProductModel.findOne({ name: payload?.name })

    if (hasProduct) {
        throw new ConflictError("A product with this name already exists.")
    }

    const productDoc = ProductModel.create(payload)

    return productDoc
}

export const doFetchAllProducts = async (): Promise<Document[]> => {
    const results = await ProductModel.find()
    return results;
}

export const doFetchProductById = async (productId: string): Promise<Document> => {

    const hasProduct = await ProductModel.findById(productId)

    if (!hasProduct) {
        throw new NotFoundError('Product not found');
    }

    return hasProduct;
}

export const doUpdateProduct = async (productId: string, payload: Product): Promise<Product> => {

    const filter = { _id: productId };
    const options = { new: true };

    const productDoc = await ProductModel.findByIdAndUpdate(filter, payload, options)

    if (!productDoc) {
        throw new NotFoundError("Product not found")
    }

    return productDoc
}


export const doDeleteProduct = async (productId: string) => {

    const deletedDoc = await ProductModel.findByIdAndDelete(productId,)

    if (!deletedDoc) {
        throw new NotFoundError('Product not found');
    }

    return deletedDoc;
}