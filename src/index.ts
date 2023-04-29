import { app } from './app'

import mongoose from 'mongoose'


const PORT: string | undefined = process.env.PORT

const startSever = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log("Connected to DB ✅")
        app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🌐`))
    } catch (error) {
        console.log("Failed to connect to DB ❌");
        console.error(error);
    }
}

startSever()