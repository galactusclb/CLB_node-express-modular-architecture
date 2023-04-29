import express, { Request, Response, Router } from 'express';

import productRouter from "features/products/product.routes"

const router: Router = express.Router();

const BASE_ROUTE = "/api/v1"

const routes:
    {
        path: string,
        route: Router
    }[] = [
        {
            path: '/product',
            route: productRouter
        }
    ]

routes?.forEach((route) => {
    router.use(BASE_ROUTE + route.path, route.route);
})

export default router;