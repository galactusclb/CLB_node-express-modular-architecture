import { Request, Response } from 'express';

export type HttpRequest = {
    body: any;
    query: any;
    params: any;
    ip: string;
    method: string;
    path: string;
    headers: {
        'Content-Type'?: string;
        Authorization?: string;
        Referer?: string;
        'User-Agent'?: string;
    };
}

export type Controller = (httpRequest: HttpRequest, httpResponse: any) => Promise<{
    headers?: { [key: string]: string };
    statusCode: number;
    body: {
        success: boolean,
        message?: string,
        data?: any
    };
}>;

const makeExpressCallback = (controller: Controller) => async (
    req: Request,
    res: Response
) => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
            'Content-Type': req.get('Content-Type'),
            Authorization: req.get('Authorization'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent')
        }
    };
    const httpResponse = await controller(httpRequest, res);
    if (httpResponse.headers) res.set(httpResponse.headers);
    return res.status(httpResponse.statusCode).send(httpResponse.body);
};

export default makeExpressCallback;
