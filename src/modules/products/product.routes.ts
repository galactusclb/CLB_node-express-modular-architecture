import express, { Router } from "express"

import { getAllProducts, getProductById } from "./product.controller"
import { makeExpressCallback } from "middlewares"

const route: Router = express.Router()

route.get("/", makeExpressCallback(getAllProducts))
route.get("/:id", makeExpressCallback(getProductById))

export default route