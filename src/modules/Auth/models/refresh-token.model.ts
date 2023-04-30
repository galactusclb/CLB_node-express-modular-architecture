import mongoose, { Schema, model } from "mongoose";
import { RefreshToken } from "../types/refresh-token.type";

const refreshTokenSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" }
})

export const RefreshTokenModel = model<RefreshToken>("RefreshToken", refreshTokenSchema)