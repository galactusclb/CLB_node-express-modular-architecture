import { doCreateProduct, doDeleteProduct, doUpdateProduct, fetchAllProducts, fetchProductById } from "./product.service"
import { Controller } from "middlewares/make-express-callback.middleware";
import { getAuthIdFromHeader } from "@utils/auth-helpers";
import { ApiResponseMessage } from "@utils/api-response-message-generator";

export const getAllProducts: Controller = async (httpRequest, httpResponse) => {
    // console.log(httpResponse?.locals?.authUserDetails?.userId);
    // console.log(httpRequest?.authUserDetails);

    // console.log(getAuthIdFromHeader(httpResponse));

    const results = await fetchAllProducts()

    return {
        statusCode: 200,
        body: {
            success: true,
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
            success: true,
            data: results
        }
    };
}

export const createProduct: Controller = async (httpRequest) => {

    const { name, price, category, sku, description } = httpRequest.body

    const results = await doCreateProduct({ name, price, category, sku, description })

    return {
        statusCode: 201,
        body: {
            success: true,
            message: ApiResponseMessage("create", "product"),
            data: results
        }
    };
}

export const updateProduct: Controller = async (httpRequest) => {

    const { id } = httpRequest.params
    const { name, price, category, sku, description } = httpRequest.body

    const results = await doUpdateProduct(
        id,
        { name, price, category, sku, description }
    )

    return {
        statusCode: 200,
        body: {
            success: true,
            message: ApiResponseMessage("update", "product"),
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
            success: true,
            message: ApiResponseMessage("delete", "product"),
            data: results
        }
    };
}

