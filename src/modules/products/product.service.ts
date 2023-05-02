import { ConflictError, NotFoundError } from "utils/api-errors";
import { ProductModel } from "./product.model";
import { Product } from "./product.interface";

export const doCreateProduct = async (payload: Product): Promise<Product> => {
    const hasProduct = await ProductModel.findOne({ name: payload?.name })

    if (hasProduct) {
        throw new ConflictError("A product with this name already exists.")
    }

    const productDoc = ProductModel.create(payload)

    return productDoc
}

export const fetchAllProducts = async () => {
    const results = await ProductModel.find()
    return results;
}

export const fetchProductById = async (productId: string) => {
    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //     throw new Error('Invalid product ID');
    // }

    const hasProduct = await ProductModel.findById(productId)

    if (!hasProduct) {
        throw new NotFoundError('Product not found');
    }

    return hasProduct;
}