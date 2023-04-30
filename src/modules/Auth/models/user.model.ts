import mongoose from "mongoose";

import { User } from "../types/user.type";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isActive: { type: Boolean, required: false }
}, {
    timestamps: true,
    toObject: { transform: function (doc, ret) { delete ret.password; } },
    toJSON: { transform: function (doc, ret) { delete ret.password; } }
})

export const UserModel = mongoose.model<User>('User', UserSchema)