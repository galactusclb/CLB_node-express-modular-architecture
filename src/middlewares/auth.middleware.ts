import { Request, Response, RequestHandler, NextFunction } from 'express';

import { UnauthorizedError } from 'utils/api-errors';
import { verifyJWT } from 'features/Auth/jwt.service';
// import { verifyJWT } from '../modules/Auth/jwt.service';

const decodeToken = async (header: string | undefined) => {
    if (!header) {
        throw new UnauthorizedError('Authorization header missing');
    }
    const token = header.replace('Bearer ', '');
    const payload = await verifyJWT({ token });
    return payload;
};

const authenticateRequest: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { method, path } = req;
    if (method === 'OPTIONS' || ['/api/v1/auth/login'].includes(path)) {
        return next();
    }
    //   req.context = await decodeToken(req.header('Authorization') || req.header('authorization'));
    return next();
};

export default authenticateRequest;
