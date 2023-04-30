// import bcrypt from "bcrypt"

import { ForbiddenError, NotFoundError } from "utils/api-errors"
import { UserModel } from "./models/user.model"
import { RefreshTokenModel } from "./models"
import { withTransaction } from "./auth.utils"
import { User } from "./types/user.type"
import { RefreshToken } from "./types/refresh-token.type"

export const doSignup = withTransaction(async (userName: string, password: string, session): Promise<{
    userDoc: User,
    refreshTokenDoc: RefreshToken
} | undefined> => {


    const hasUser = await UserModel.findOne({
        userName
    })

    if (hasUser) {
        throw new ForbiddenError("Can't create a user with that credential.")
    }

    const userDoc = new UserModel({
        userName: userName,
        password: password
    })

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


export const doLogin = async (userName: string, password: string) => {
    const user = await UserModel.find({
        // $where : {

        // }
    })

    if (!user) {
        throw new NotFoundError("User not found")
    }

    return user

}