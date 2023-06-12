import { Request, Response, RequestHandler, NextFunction } from 'express';

import { UnauthorizedError } from 'utils/api-errors';
import { verifyJWT } from '@utils/jwt-helper';

const decodeToken = async (header: string | undefined) => {
    if (!header) {
        throw new UnauthorizedError('Authorization header missing');
    }

    const token = header.replace('Bearer ', '');
    const payload = await verifyJWT({ token });
    return payload;
};

export const AuthGuard: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { method, path } = req;

    if (method === 'OPTIONS' || ['/api/v1/auth/login'].includes(path)) {
        return next();
    }

    // req.authUserDetails = await decodeToken(req.header('Authorization') || req.header('authorization'));
    res.locals.authUserDetails = await decodeToken(req.header('Authorization') || req.header('authorization'));
    return next();
};

export default AuthGuard;
