import { doCreateProduct, doDeleteProduct, fetchAllProducts, fetchProductById } from "./product.service"
import { Controller } from "middlewares/make-express-callback.middleware";
import { getAuthIdFromHeader } from "@utils/auth-helpers";

export const getAllProducts: Controller = async (httpRequest, httpResponse) => {
    // console.log(httpResponse?.locals?.authUserDetails?.userId);
    // console.log(httpRequest?.authUserDetails);

    // console.log(getAuthIdFromHeader(httpResponse));

    const results = await fetchAllProducts()

    return {
        statusCode: 200,
        body: {
            data: results
        }
    };
}

export const getProductById: Controller = async (httpRequest) => {

    const { id } = httpRequest.params

    const results = await fetchProductById(id)

    return {
        statusCode: 200,
        body: {
            data: results
        }
    };
}

export const createProduct: Controller = async (httpRequest) => {

    const { name, price, category, sku, description } = httpRequest.body

    const results = await doCreateProduct({ name, price, category, sku, description })

    return {
        statusCode: 200,
        body: {
            data: results
        }
    };
}

export const deleteProduct: Controller = async (httpRequest) => {

    const { id } = httpRequest.params

    const results = await doDeleteProduct(id)

    return {
        statusCode: 200,
        body: {
            status: true,
            message: "The selected item has been deleted",
            data: results
        }
    };
}

