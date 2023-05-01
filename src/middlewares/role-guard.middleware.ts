import { Request, Response, RequestHandler, NextFunction } from 'express';

import { UnauthorizedError } from 'utils/api-errors';
import { verifyJWT } from 'modules/Auth/jwt.service';


export const RoleGuard = (role: string): RequestHandler => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        console.log(`Role : ${role}`);

        return next();
    }
};

export default RoleGuard;
