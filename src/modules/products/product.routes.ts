import express, { Router } from "express"

import { createProduct, getAllProducts, getProductById } from "./product.controller"
import { RoleGuard, makeExpressCallback } from "middlewares"
import { AuthGuard } from "middlewares"
import { constants } from "@utils/constants"

const route: Router = express.Router()

route.get("/", makeExpressCallback(getAllProducts))
route.get("/:id", AuthGuard, makeExpressCallback(getProductById))
route.post("/", AuthGuard, RoleGuard(constants.AUTH_ROLES.USER), makeExpressCallback(createProduct))

export default route