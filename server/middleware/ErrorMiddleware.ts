import {ErrorRequestHandler} from "express";

export const errHandler: ErrorRequestHandler = (err, req, res, next)=> {
    //TODO use logger library winston
    
    console.error('uncaught error',err);
    return res.status(500).send("Oops, please try again");
}
