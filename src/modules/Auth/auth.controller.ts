
import { Controller } from "middlewares/make-express-callback.middleware";
import { doCreateNewRefreshToken, doDeleteRefreshToken, doLogin, doSignup } from "./auth.service";
import { InternalServerError, UnauthorizedError } from "utils/api-errors";
import { createAccessToken, createRefreshToken, validateRefreshToken } from "./auth.utils";

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

export const newRefreshToken: Controller = async (httpRequest) => {

    const { refreshToken } = httpRequest.body

    const decodedRefreshToken = await validateRefreshToken(refreshToken)

    if (!decodedRefreshToken) {
        throw new UnauthorizedError("Unauthorized token 1")
    }

    if (decodedRefreshToken?.error) {
        console.log(decodedRefreshToken?.decodedToken);

        await doDeleteRefreshToken(decodedRefreshToken?.decodedToken?.tokenId);

        throw new UnauthorizedError("Unauthorized token 23");
    }

    const refreshTokenDoc = await doCreateNewRefreshToken(decodedRefreshToken?.userId, decodedRefreshToken?.tokenId)

    if (!refreshTokenDoc || !refreshTokenDoc?._id) {
        throw new InternalServerError()
    }

    const newRefreshToken = createRefreshToken(decodedRefreshToken.userId, refreshTokenDoc?._id)
    const newAccessToken = createAccessToken(decodedRefreshToken.userId)

    return {
        statusCode: 200,
        body: {
            id: decodedRefreshToken.userId,
            refreshToken: newRefreshToken,
            accessToken: newAccessToken
        }
    }

}