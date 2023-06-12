import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { APIError, BadRequestError, NotFoundError } from "../utils/api-errors";
import mongoose from "mongoose";

const errorHandler = async (error: APIError, req: Request, res: Response, next: NextFunction) => {
    // logger.error(error);

    //? catch mongoose errors
    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send({
            error: {
                code: 400,
                message: "Invalid Id. Id must be a string of 12 bytes or a string of 24 hex characters."
            }
        });
    }

    //? catch api error
    if (error instanceof APIError) {
        return res.status(error.status).send({
            error: {
                code: error.status,
                message: error.message,
                data: error?.data
            }
        });
    }


    //? catch db error
    // if (error instanceof UniqueConstraintError) {
    //   return res.status(400).send({
    //     error: {
    //       code: 400,
    //       message: `duplicate_${error.parent.constraint}`
    //     }
    //   });
    // }

    // if (error instanceof ValidationError) {
    //   return res.status(400).send({
    //     error: {
    //       code: 400,
    //       message: error.message
    //     }
    //   });
    // }

    // if (error instanceof AggregateError) {
    //   return res.status(400).send({
    //     error: {
    //       code: 400,
    //       message: error.errors[0].errors.errors[0].message
    //     }
    //   });
    // }

    //!unhandled errors
    console.error("🛑🛑 Unhandled error❌🛑🛑");
    console.error(error);

    //? connect all errors
    return res.status(500).send({
        error: {
            code: 500,
            message: 'Something went wrong!'
        }
    });
};

const notFoundHandler = async (req: Request, res: Response) => {
    const errorMessage = `Not Found: ${req.method} on ${req.url}`;
    throw new NotFoundError(errorMessage);
};

const badJsonHandler: ErrorRequestHandler = async (err: APIError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        throw new BadRequestError(err.message);
    }
    return next();
};

export {
    notFoundHandler,
    badJsonHandler,
    errorHandler
}