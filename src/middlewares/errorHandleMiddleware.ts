import { NextFunction, Request, Response } from "express";

export async function errorHandleMiddleware(
    error: any,
    req: Request, 
    res: Response, 
    next: NextFunction
){
    console.log(error);
    if(error.type === "bad request"){
        return res.sendStatus(400);
    }
    if(error.type === "not found"){
        return res.sendStatus(404);
    }
    if(error.type === "conflict"){
        return res.sendStatus(409);
    }
    if(error.type === "unauthorized"){
        return res.sendStatus(401);
    }
    
    return res.sendStatus(500);
}