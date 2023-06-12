import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "utils/api-errors";

const makeValidatorCallback = (validator: any[]) => [
    ...validator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new BadRequestError(undefined, errors.array());
        }
        return next();
    }
];

export default makeValidatorCallback;