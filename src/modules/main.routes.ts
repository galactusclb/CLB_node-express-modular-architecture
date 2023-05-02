import express, { Router } from 'express';

import authRouter from "modules/Auth/auth.routes"
import productRouter from "modules/products/product.routes"

const router: Router = express.Router();

const BASE_ROUTE = "/api/v1"

const routes:
    {
        path: string,
        route: Router
    }[] = [
        {
            path: '/auth',
            route: authRouter
        },
        {
            path: '/products',
            route: productRouter
        },
    ]

routes?.forEach((route) => {
    router.use(BASE_ROUTE + route.path, route.route);
})

export default router;