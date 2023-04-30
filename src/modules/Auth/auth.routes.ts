import express, { Router } from "express"

import { makeExpressCallback } from "middlewares"
import { login, signUp } from "./auth.controller"

const route: Router = express.Router()

route.post("/signup", makeExpressCallback(signUp))
route.post("/login", makeExpressCallback(login))
route.get("/logout", makeExpressCallback(login))
route.get("/accessToken", makeExpressCallback(login))
route.get("/refreshToken", makeExpressCallback(login))

export default route