import jwt, { TokenExpiredError } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

import { AuthToken } from 'types/auth-toke.model';
import { constants } from "utils/constants";
import { InternalServerError, UnauthorizedError } from "utils/api-errors";

export const createAccessToken = (payload: AuthToken) => {

    const jwtPayload: AuthToken = {
        userId: payload?.userId,
        tokenId: payload?.tokenId,
        role: payload.role
    }

    return jwt.sign(
        jwtPayload,
        constants.JWT_ACCESS_TOKEN_SECRET!,
        {
            expiresIn: constants.ACCESS_TOKEN_EXPIRES_IN || '10m'
        }
    )
}

export const createRefreshToken = (payload: AuthToken) => {

    const jwtPayload: AuthToken = {
        userId: payload?.userId,
        tokenId: payload?.tokenId,
        role: payload.role
    }

    return jwt.sign(
        jwtPayload,
        constants.JWT_REFRESH_TOKEN_SECRET!,
        {
            expiresIn: constants.REFRESH_TOKEN_EXPIRES_IN || "30d"
        }
    )
}

export const validateRefreshToken = (refreshToken: string): any => {
    try {
        return jwt.verify(refreshToken, constants.JWT_REFRESH_TOKEN_SECRET!)
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const decodedToken = jwt.decode(refreshToken);

            return {
                decodedToken,
                error
            }
        }

        throw new UnauthorizedError("Unauthorized token")
    }
}


export const generateHashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const verifyHashPassword = async (rowPassword: string, hashedPassword?: string): Promise<boolean> => {

    if (!hashedPassword) {
        throw new InternalServerError("hashed password is missing")
    }

    const match = await bcrypt.compare(rowPassword, hashedPassword)
    return match
}
