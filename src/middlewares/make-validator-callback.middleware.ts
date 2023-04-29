import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "utils/api-errors";

type Validator = (httpRequest: {
    body: any;
    query: any;
    params: any;
}) => { error?: Error; value: any };

const makeValidatorCallback = (validator: Validator) => (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params
    };
    const { error, value } = validator(httpRequest);
    if (error) {
        throw new BadRequestError(error.message);
    }
    req.body = value;
    return next();
};

export default makeValidatorCallback;