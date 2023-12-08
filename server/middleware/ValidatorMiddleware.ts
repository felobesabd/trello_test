import { validationResult } from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validatorMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(404).json( { errors: error.array() } );
    }

    next();
}