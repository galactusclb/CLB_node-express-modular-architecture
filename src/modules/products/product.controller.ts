import { Controller } from "middlewares/make-express-callback.middleware";
import { getAuthIdFromHeader } from "@utils/auth-helpers";
import { ApiResponseMessage } from "@utils/api-response-message-generator";
import { doCreateProduct, doDeleteProduct, doFetchAllProducts, doFetchProductById, doUpdateProduct } from "./product.service"
import { transformProductData } from "./product.dto";

export const getAllProducts: Controller = async (httpRequest, httpResponse) => {
    // console.log(httpResponse?.locals?.authUserDetails?.userId);
    // console.log(httpRequest?.authUserDetails);

    // console.log(getAuthIdFromHeader(httpResponse));

    const results = await doFetchAllProducts()

    return {
        statusCode: 200,
        body: {
            success: true,
            data: transformProductData(results.map((item) => item.toObject()))
        }
    };
}

export const getProductById: Controller = async (httpRequest) => {

    const { id } = httpRequest.params

    const results = await doFetchProductById(id)

    return {
        statusCode: 200,
        body: {
            success: true,
            // data: results
            data: transformProductData(results?.toObject())
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

