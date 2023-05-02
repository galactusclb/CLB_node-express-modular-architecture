import express, { Router } from "express"

import { createProduct, deleteProduct, getAllProducts, getProductById } from "./product.controller"
import { RoleGuard, makeExpressCallback } from "middlewares"
import { AuthGuard } from "middlewares"
import { constants } from "@utils/constants"

const route: Router = express.Router()

route.get("/", makeExpressCallback(getAllProducts))
route.post("/", AuthGuard, RoleGuard(constants.AUTH_ROLES.ADMIN), makeExpressCallback(createProduct))
route.get("/:id", AuthGuard, makeExpressCallback(getProductById))
route.delete("/:id", AuthGuard, RoleGuard(constants.AUTH_ROLES.ADMIN), makeExpressCallback(deleteProduct))

export default route