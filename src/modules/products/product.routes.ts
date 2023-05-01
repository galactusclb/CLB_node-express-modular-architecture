import express, { Router } from "express"

import { getAllProducts, getProductById } from "./product.controller"
import { RoleGuard, makeExpressCallback } from "middlewares"
import { AuthGuard } from "middlewares"

const route: Router = express.Router()

route.get("/", makeExpressCallback(getAllProducts))
route.get("/:id", AuthGuard, makeExpressCallback(getProductById))
// route.post("/", AuthGuard, RoleGuard("admin"), makeExpressCallback(creteProduct))

export default route