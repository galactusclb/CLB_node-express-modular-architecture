import express, { Router } from "express"

import { makeExpressCallback, makeValidatorCallback } from "middlewares"
import { login, logout, logoutAll, newAccessToken, newRefreshToken, signUp } from "./auth.controller"
import { validateLogin, validateRegister } from "./auth.validator"

const route: Router = express.Router()

route.post("/signup", makeValidatorCallback(validateRegister), makeExpressCallback(signUp))
route.post("/login", makeValidatorCallback(validateLogin), makeExpressCallback(login))
route.post("/logout", makeExpressCallback(logout))
route.post("/logoutAll", makeExpressCallback(logoutAll))
route.post("/accessToken", makeExpressCallback(newAccessToken))
route.post("/refreshToken", makeExpressCallback(newRefreshToken))

export default route