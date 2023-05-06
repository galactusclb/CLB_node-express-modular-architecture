import mongoose from "mongoose";

export interface User {
    _id: mongoose.Types.ObjectId
    email: string
    userName: string
    password?: string
    role?: string
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}