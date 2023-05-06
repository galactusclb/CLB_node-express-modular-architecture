
import { constants } from "@utils/constants"
import { excludeProperties } from "@utils/common-helper"
import { AccessDeniedError, ForbiddenError, NotFoundError, UnauthorizedError } from "@utils/api-errors"
import { withTransaction } from "@utils/mongoose-helper"

import { RefreshTokenModel } from "./models"
import { UserModel } from "./models/user.model"
import { generateHashPassword, verifyHashPassword } from "./auth.utils"
import { User } from "./types/user.type"
import { RefreshToken } from "./types/refresh-token.type"



export const doSignup = withTransaction(async (email: string, userName: string, password: string, session): Promise<{
    userDoc: User,
    refreshTokenDoc: RefreshToken
} | undefined> => {

    const hasUser = await UserModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })

    if (hasUser) {
        throw new ForbiddenError("Can't create a user with that credential.")
    }

    const hashedPassword = await generateHashPassword(password);

    let userDoc = new UserModel({
        email,
        userName,
        password: hashedPassword,
        role: constants?.AUTH_ROLES?.USER
    })

    const refreshTokenDoc = new RefreshTokenModel({
        owner: userDoc.id
    })

    await userDoc.save({ session })
    await refreshTokenDoc.save({ session })

    userDoc = excludeProperties(userDoc, ["password", "createdAt", "updatedAt"])

    return {
        userDoc,
        refreshTokenDoc
    }
})


export const doLogin = withTransaction(async (userName: string, password: string, session): Promise<{
    userDoc: User,
    refreshTokenDoc: RefreshToken
} | undefined> => {

    let userDoc = await UserModel.findOne({ userName }).select("+password").lean()

    if (!userDoc) {
        throw new NotFoundError("User not found")
    }

    const isMatched = await verifyHashPassword(password, userDoc?.password)

    if (!isMatched) {
        throw new AccessDeniedError("The entered username or password is not valid. Please check your credentials and try again.")
    }

    const refreshTokenDoc = new RefreshTokenModel({
        owner: userDoc._id
    })

    await refreshTokenDoc.save({ session })

    userDoc = excludeProperties(userDoc, ["password", "createdAt", "updatedAt"])

    return {
        userDoc,
        refreshTokenDoc
    }
})

export const doCreateNewRefreshToken = withTransaction(async (userId: string, currentRefreshTokenID: string, session): Promise<RefreshToken> => {

    const tokenExists = await RefreshTokenModel.exists({ _id: currentRefreshTokenID })

    if (!tokenExists) {
        throw new UnauthorizedError("Unauthorized token 2")
    }

    const refreshTokenDoc = new RefreshTokenModel({
        owner: userId
    })

    await refreshTokenDoc.save({ session })

    const gg = await RefreshTokenModel.deleteOne({ _id: currentRefreshTokenID }, { session })
    console.log(gg);

    return refreshTokenDoc
})

export const doDeleteRefreshToken = async (refreshTokenID: string) => {

    const deletedRes = await RefreshTokenModel.deleteOne({ _id: refreshTokenID })

    console.log(deletedRes);

    if (deletedRes?.deletedCount) {
        console.log("A refresh token has been deleted.");
    }

    return true
}

export const doDeleteAllRefreshToken = async (userID: string) => {

    const deletedRes = await RefreshTokenModel.deleteMany({ owner: userID })

    console.log(deletedRes);

    if (deletedRes?.deletedCount) {
        console.log("A refresh token has been deleted.");
    }

    return true
}