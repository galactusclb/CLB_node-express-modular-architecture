// import { Request } from 'express';

// declare module 'express' {
//     interface Request {
//         authUserDetails: any;
//     }
// }

declare namespace Express {
    export interface Request {
        authUserDetails?: any;
    }
}