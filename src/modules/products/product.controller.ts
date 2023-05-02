import { fetchAllProducts, fetchProductById } from "./product.service"
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