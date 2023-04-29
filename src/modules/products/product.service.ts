import { NotFoundError } from "utils/api-errors";
import { ProductModel } from "./product.model";

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