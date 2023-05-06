import mongoose from "mongoose";

import { User } from "../types/user.type";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String },
    isActive: { type: Boolean, required: false }
}, {
    timestamps: true,
    // versionKey: false,
    toObject: { transform: function (doc, ret) { delete ret.password; delete ret.__v; } },
    toJSON: { transform: function (doc, ret) { delete ret.password; delete ret.__v; } }
})

// UserSchema.path('__v', {
//     type: Number,
//     select: false
// });

export const UserModel = mongoose.model<User>('User', UserSchema)