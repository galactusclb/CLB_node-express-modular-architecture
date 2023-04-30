import express, { Application, Request, Response } from "express"
import cors from 'cors';
import "dotenv/config";

import 'express-async-errors';

import routes from "modules/main.routes"
import { badJsonHandler, errorHandler, notFoundHandler } from "middlewares";


const app: Application = express()
app.use(express.json())

// error handler


//!  modular / layered architecture

// var allowedOrigins = ['*', 'http://example2.com']

// var corsOptions = {
//     origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//         console.log(origin);

//         if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions))
app.use(cors())


// handle bad json format
app.use(badJsonHandler);


app.get('/', (req: Request, res: Response) => {
    res.send({ message: "Base route : 🔥😊" })
})

app.use("/", routes)

// handle 404 not found error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);

export { app }