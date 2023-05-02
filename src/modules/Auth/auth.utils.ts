import mongoose from "mongoose";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

import { AuthToken } from 'types/auth-toke.model';
import { constants } from "utils/constants";
import { User } from "./types/user.type";
import { InternalServerError, UnauthorizedError } from "utils/api-errors";

// export const withTransaction = (fn: (req: Request, res: Response, session: any) => Promise<any>) => {
export const withTransaction = <T>(fn: (...args: any[]) => Promise<T>): ((...args: any[]) => Promise<T | undefined>) => {
    return async (...args: any[]) => {
        let result: T | undefined;
        // try {
        await mongoose.connection.transaction(async (session) => {
            // if (args[args.length - 1] !== session) {
            //     throw new Error('Session parameter is required');
            // }
            // result = await fn(...args)
            // return result

            result = await fn(...args, session)
            return result
        })
        // } catch (error) {
        //     // Handle error here
        //     console.log(error);
        // }
        return result;
    }
}


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

export const excludeProperties = <T>(obj: T, excludedProperties: (keyof T)[]): Omit<T, keyof typeof excludedProperties[number]> => {
    const newObj = {} as T;
    for (const key in obj) {
        if (!excludedProperties.includes(key as keyof T)) {
            newObj[key as keyof T] = obj[key as keyof T];
        }
    }
    return newObj;
}