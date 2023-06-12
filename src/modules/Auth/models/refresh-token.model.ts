import mongoose, { Schema, model } from "mongoose";
import { RefreshToken } from "../types/refresh-token.type";

const refreshTokenSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" }
},
    {
        timestamps: true,
        toJSON: { transform: function (doc, ret) { delete ret.__v; } },
        toObject: { transform: function (doc, ret) { delete ret.__v; } },
    }
)

// refreshTokenSchema.path('__v', {
//     type: Number,
//     select: false
// });

export const RefreshTokenModel = model<RefreshToken>("RefreshToken", refreshTokenSchema)