import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

import { constants } from "utils/constants";
import { User } from "./types/user.type";
import { InternalServerError } from "utils/api-errors";

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


export const createAccessToken = (userId: mongoose.Types.ObjectId) => {

    return jwt.sign(
        {
            userId: userId
        },
        constants.JWT_ACCESS_TOKEN_SECRET!,
        {
            expiresIn: '10m'
        }
    )
}

export const createRefreshToken = (userId: mongoose.Types.ObjectId, refreshTokenId: mongoose.Types.ObjectId) => {

    return jwt.sign(
        {
            userId: userId,
            tokenId: refreshTokenId
        },
        constants.JWT_REFRESH_TOKEN_SECRET!,
        {
            expiresIn: '30d'
        }
    )
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