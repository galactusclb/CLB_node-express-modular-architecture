import mongoose from "mongoose";

export interface AuthToken {
    userId?: string | mongoose.Types.ObjectId,
    tokenId?: string | mongoose.Types.ObjectId,
    role?: string
}