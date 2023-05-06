
import { Controller } from "middlewares/make-express-callback.middleware";
import { doCreateNewRefreshToken, doDeleteAllRefreshToken, doDeleteRefreshToken, doLogin, doSignup } from "./auth.service";
import { InternalServerError, UnauthorizedError } from "utils/api-errors";
import { createAccessToken, createRefreshToken, validateRefreshToken } from "./auth.utils";

export const signUp: Controller = async (httpRequest) => {
    const { email, userName, password } = httpRequest.body

    const signupResult = await doSignup(email, userName, password)

    if (!signupResult || !signupResult.userDoc._id || !signupResult.refreshTokenDoc?._id) {
        throw new InternalServerError()
    }

    const accessToken = createAccessToken({
        tokenId: signupResult.refreshTokenDoc?._id,
        userId: signupResult.userDoc._id,
        role: signupResult.userDoc.role,
    })

    const refreshToken = createRefreshToken({
        tokenId: signupResult.refreshTokenDoc?._id,
        userId: signupResult.userDoc._id,
        role: signupResult.userDoc.role,
    })

    return {
        statusCode: 201,
        body: {
            success: true,
            data: {
                userDoc: signupResult?.userDoc,
                refreshToken,
                accessToken
            }
        }
    }
}

export const login: Controller = async (httpRequest) => {
    const { userName, password } = httpRequest.body

    const loginData = await doLogin(userName, password)

    if (!loginData || !loginData.userDoc._id || !loginData.refreshTokenDoc?._id) {
        throw new InternalServerError()
    }

    const accessToken = createAccessToken({
        tokenId: loginData.refreshTokenDoc?._id,
        userId: loginData.userDoc._id,
        role: loginData.userDoc.role,
    })
    // const refreshToken = createRefreshToken(loginData.userDoc._id, loginData.refreshTokenDoc?._id)

    const refreshToken = createRefreshToken({
        tokenId: loginData.refreshTokenDoc?._id,
        userId: loginData.userDoc._id,
        role: loginData.userDoc.role,
    })

    return {
        statusCode: 201,
        body: {
            success: true,
            data: {
                userDoc: loginData?.userDoc,
                refreshToken,
                accessToken
            }
        }
    }
}

export const logout: Controller = async (httpRequest) => {

    const { refreshToken } = httpRequest.body

    const decodedRefreshToken = await validateRefreshToken(refreshToken)

    await doDeleteRefreshToken(decodedRefreshToken?.tokenId);

    return {
        statusCode: 201,
        body: {
            success: true,
            message: "Successfully logout"
        }
    }
}

export const logoutAll: Controller = async (httpRequest) => {

    const { refreshToken } = httpRequest.body

    const decodedRefreshToken = await validateRefreshToken(refreshToken)

    await doDeleteAllRefreshToken(decodedRefreshToken?.userId);

    return {
        statusCode: 201,
        body: {
            success: true,
            message: "Successfully logout from all devices"
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

    // const newRefreshToken = createRefreshToken(decodedRefreshToken.userId, refreshTokenDoc?._id)

    const newRefreshToken = createRefreshToken({
        tokenId: refreshTokenDoc?._id,
        userId: decodedRefreshToken.userDoc._id,
        role: decodedRefreshToken.userDoc.role,
    })

    const newAccessToken = createAccessToken(decodedRefreshToken.userId)

    return {
        statusCode: 200,
        body: {
            success: true,
            data: {
                id: decodedRefreshToken.userId,
                refreshToken: newRefreshToken,
                accessToken: newAccessToken
            }
        }
    }

}

export const newAccessToken: Controller = async (httpRequest) => {

    const { refreshToken } = httpRequest.body

    const decodedRefreshToken = await validateRefreshToken(refreshToken)

    if (decodedRefreshToken?.error) {

        await doDeleteRefreshToken(decodedRefreshToken?.decodedToken?.tokenId);

        throw new UnauthorizedError("Unauthorized token acce");
    }

    const newAccessToken = createAccessToken(decodedRefreshToken.userId)

    return {
        statusCode: 200,
        body: {
            success: true,
            data: {
                id: decodedRefreshToken.userId,
                refreshToken,
                accessToken: newAccessToken
            }
        }
    }
}