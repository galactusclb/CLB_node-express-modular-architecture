import { Request, Response, RequestHandler, NextFunction } from 'express';

import { UnauthorizedError } from 'utils/api-errors';
import { verifyJWT } from '@utils/jwt-helper';
import { getAuthIdFromHeader } from '@utils/auth-helpers';
import { AuthToken } from 'types/auth-toke.model';


export const RoleGuard = (authorizedRoles: string | string[]): RequestHandler => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const user: AuthToken = getAuthIdFromHeader(res)

        if (!user || !user?.role) throw new UnauthorizedError("Unauthorized! You do not have the necessary authentication to access this content.")


        const isAuthorized = Array.isArray(authorizedRoles)
            ? authorizedRoles.includes(user?.role)
            : authorizedRoles === user?.role;


        if (!isAuthorized) throw new UnauthorizedError("Unauthorized! You do not have the necessary authentication to access this content.")

        return next();
    }
};

export default RoleGuard;
