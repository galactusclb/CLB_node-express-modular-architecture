import mongoose from "mongoose";

// export const withTransaction = (fn: (req: Request, res: Response, session: any) => Promise<any>) => {
export const withTransaction = <T>(fn: (...args: any[]) => Promise<T>): ((...args: any[]) => Promise<T | undefined>) => {
    return async (...args: any[]) => {
        let result: T | undefined;
        // try {
        await mongoose.connection.transaction(async (session) => {
            // if (args[args.length - 1] !== session) {
            //     throw new Error('Session parameter is required');
            // }
            // result = await fn(...args)
            // return result

            result = await fn(...args, session)
            return result
        })
        // } catch (error) {
        //     // Handle error here
        //     console.log(error);
        // }
        return result;
    }
}
