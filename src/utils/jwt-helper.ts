import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { constants } from "utils/constants";
import { BadRequestError, UnauthorizedError } from 'utils/api-errors';

const signOption: SignOptions = {}

const generateJWT = async ({
    payload,
    secretKey = constants.JWT_ACCESS_TOKEN_SECRET!,
    // signOption = signOption
}: {
    payload: any;
    secretKey: string;
    signOption?: jwt.SignOptions;
}) => {
    try {
        const token = `Bearer ${jwt.sign(
            payload,
            secretKey,
            // signOption
        )}`;
        return token;
    } catch (error) {
        if (error instanceof Error) {
            throw new BadRequestError(error.message);
        } else {
            throw new BadRequestError('An unknown error occurred');
        }
    }
};

const verifyJWT = async ({
    token,
    secretKey = constants.JWT_ACCESS_TOKEN_SECRET!,
    signOption = constants.JWT_SIGN_OPTIONS
}: {
    token: string;
    secretKey?: string;
    signOption?: jwt.VerifyOptions;
}) => {
    try {
        const data = jwt.verify(
            token,
            secretKey,
            signOption
        );
        return data;
    } catch (error) {
        console.log(error);

        if (error instanceof TokenExpiredError) {
            throw new UnauthorizedError()
        } else if (error instanceof Error) {
            throw new BadRequestError(error.message);
        } else {
            throw new BadRequestError('An unknown error occurred');
        }
    }
};

export { generateJWT, verifyJWT };
