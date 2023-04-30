import jwt from "jsonwebtoken"

import { Controller } from "middlewares/make-express-callback.middleware";
import { doLogin, doSignup } from "./auth.service";
import { constants } from "utils/constants";
import { response } from "express";
import mongoose from "mongoose";
import { InternalServerError } from "utils/api-errors";

export const signUp: Controller = async (httpRequest) => {
    const { userName, password } = httpRequest.body
    const signupResult = await doSignup(userName, password)

    console.log(signupResult);

    if (!signupResult || !signupResult.userDoc._id || !signupResult.refreshTokenDoc?._id) {
        throw new InternalServerError()
    }

    const accessToken = createAccessToken(signupResult.userDoc._id)
    const refreshToken = createRefreshToken(signupResult.userDoc._id, signupResult.refreshTokenDoc?._id)

    return {
        statusCode: 201,
        body: {
            userDoc: signupResult?.userDoc,
            refreshToken,
            accessToken
        }
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

export const login: Controller = async (httpRequest) => {

    const { userName, password } = httpRequest.body

    const loginData = await doLogin(userName, password)

    return {
        statusCode: 200,
        body: {
            data: loginData
        }
    }
}
