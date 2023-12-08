import {RequestHandler} from "express";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
}

export interface Board {
    id?: number;
    name?: string;
    userId?: number;
    createdAt?: string;
}

export interface List {
    id?: number;
    name?: string;
    boardId?: number;
    createdAt?: string;
}

export interface ListItem {
    id?: number;
    content: string;
    listId: number;
    createdAt?: string;
}

export type WithError<T> = T & { error: any };

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<WithError<Res>>, Partial<Req>, any>;

export interface JwtObj {
    userId: any;
}