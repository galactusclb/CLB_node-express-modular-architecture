
import { AccessDeniedError, ForbiddenError, NotFoundError } from "utils/api-errors"
import { UserModel } from "./models/user.model"
import { RefreshTokenModel } from "./models"
import { excludeProperties, generateHashPassword, verifyHashPassword, withTransaction } from "./auth.utils"
import { User } from "./types/user.type"
import { RefreshToken } from "./types/refresh-token.type"



export const doSignup = withTransaction(async (userName: string, password: string, session): Promise<{
    userDoc: User,
    refreshTokenDoc: RefreshToken
} | undefined> => {

    const hasUser = await UserModel.findOne({ userName })

    if (hasUser) {
        throw new ForbiddenError("Can't create a user with that credential.")
    }

    const hashedPassword = await generateHashPassword(password);

    const userDoc = new UserModel({ userName, password: hashedPassword })

    const refreshTokenDoc = new RefreshTokenModel({
        owner: userDoc.id
    })

    await userDoc.save({ session })
    await refreshTokenDoc.save({ session })

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