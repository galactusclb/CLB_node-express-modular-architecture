import { Request, Response } from "express";

import { fetchAllProducts, fetchProductById } from "./product.service"
import { Controller } from "middlewares/make-express-callback.middleware";

export const getAllProducts: Controller = async () => {
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