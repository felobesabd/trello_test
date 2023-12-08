import {JwtObj} from "./types";
// @ts-ignore
import jwt from "jsonwebtoken";

export function signJwt(obj: JwtObj): string {
    return jwt.sign(obj, secretJwt())
}

export function verifyJwt(token: string): JwtObj {
    return jwt.verify(token, secretJwt()) as JwtObj;
}

export function secretJwt(){
    const secret = process.env.SECRET_JWT;

    if (!secret) {
        console.log('Missing JWT secret');
        process.exit(1);
    }

    return secret;
}