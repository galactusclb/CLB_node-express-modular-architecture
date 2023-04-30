import express, { Router } from "express"

import { makeExpressCallback } from "middlewares"
import { login, newRefreshToken, signUp } from "./auth.controller"

const route: Router = express.Router()

route.post("/signup", makeExpressCallback(signUp))
route.post("/login", makeExpressCallback(login))
route.get("/logout", makeExpressCallback(login))
route.get("/accessToken", makeExpressCallback(login))
route.post("/refreshToken", makeExpressCallback(newRefreshToken))

export default route