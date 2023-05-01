import express, { Router } from "express"

import { makeExpressCallback } from "middlewares"
import { login, logout, logoutAll, newAccessToken, newRefreshToken, signUp } from "./auth.controller"

const route: Router = express.Router()

route.post("/signup", makeExpressCallback(signUp))
route.post("/login", makeExpressCallback(login))
route.post("/logout", makeExpressCallback(logout))
route.post("/logoutAll", makeExpressCallback(logoutAll))
route.post("/accessToken", makeExpressCallback(newAccessToken))
route.post("/refreshToken", makeExpressCallback(newRefreshToken))

export default route