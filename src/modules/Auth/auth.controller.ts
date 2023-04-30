
import { Controller } from "middlewares/make-express-callback.middleware";
import { doLogin, doSignup } from "./auth.service";
import { InternalServerError } from "utils/api-errors";
import { createAccessToken, createRefreshToken } from "./auth.utils";

export const signUp: Controller = async (httpRequest) => {
    const { userName, password } = httpRequest.body
    const signupResult = await doSignup(userName, password)

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

export const login: Controller = async (httpRequest) => {

    const { userName, password } = httpRequest.body

    const loginData = await doLogin(userName, password)

    if (!loginData || !loginData.userDoc._id || !loginData.refreshTokenDoc?._id) {
        throw new InternalServerError()
    }

    const accessToken = createAccessToken(loginData.userDoc._id)
    const refreshToken = createRefreshToken(loginData.userDoc._id, loginData.refreshTokenDoc?._id)

    return {
        statusCode: 201,
        body: {
            userDoc: loginData?.userDoc,
            refreshToken,
            accessToken
        }
    }
}
