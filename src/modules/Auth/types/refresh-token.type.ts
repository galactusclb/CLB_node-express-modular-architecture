import mongoose, { Schema } from "mongoose";

export interface RefreshToken {
    _id?: mongoose.Types.ObjectId | undefined,
    owner: Schema.Types.ObjectId
}