import crypto from "crypto";

import {ExpressHandler, User} from "../types";
import {SignInRequest, SignUpRequest} from "../request/user/AuthRequest";
import {SignInResponse, SignUpResponse} from "../response/user/AuthResponse";
import {UserModelObj} from "../database/sql/UserModel";
import {signJwt} from "../auth";
import {GetUserRequest, GetUsersRequest} from "../request/user/GetRequest";
import {GetUserResponse, GetUsersResponse} from "../response/user/GetResponse";
import {UpdateUserRequest} from "../request/user/UpdateRequest";
import {UpdateUserResponse} from "../response/user/UpdateResponse";
import {DeleteUserRequest} from "../request/user/DeleteRequest";
import {DeleteUserResponse} from "../response/user/DeleteResponse";

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res)=> {

    const name: string = req.body.name!;
    const email: string = req.body.email!;
    const username: string = req.body.username!;
    const password: string = req.body.password!;

    const existing = (await UserModelObj.getUserByEmail(email)) || (await UserModelObj.getUserByUsername(username));
    if (existing) {
        return res.status(403).send({error: 'User already exists'});
    }

    const user: User = {
        name,
        email,
        username,
        password: hashPassword(password),
    }

    const userInsertedId = await UserModelObj.createUser(user);

    const jwt = signJwt({
        userId: userInsertedId
    })


    // @ts-ignore
    return res.status(201).send({
        users: user,
        jwt
    })
};

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res)=> {
    const {login, password} = req.body;
    if (!login || !password) {
        return res.status(403).send({error: 'login | password fields required'})
    }

    const existing = (await UserModelObj.getUserByEmail(login)) || (await UserModelObj.getUserByUsername(login));
    if (!existing || existing.password !== hashPassword(password)) {
        return res.status(403).send({error: 'Not found user by email or username'})
    }

    const jwt = signJwt({userId: existing.id})

    return res.status(200).send({
        user: {
            id: existing.id,
            name: existing.name,
            email: existing.email,
            username: existing.username
        },
        jwt,
    });
};

function hashPassword(password: string): string {
    return crypto.pbkdf2Sync(password, process.env.USER_PASSWORD!, 10, 24, 'sha512').toString('hex');
}

export const getUsersHandler: ExpressHandler<GetUsersRequest, GetUsersResponse> = async (req, res)=> {
    return res.status(200).send({
        users: await UserModelObj.getUsers()
    })
};

export const allowedTo = (req: any, res: any, next: any) => {
    const { role } = req.query;

    if (role === 'admin') {
        console.log(role);
        next();
    } else {
        return res.send({ error: 'You are not allowed to access this route'})
    }
};

export const getUserHandler: ExpressHandler<GetUserRequest, GetUserResponse> = async (req, res)=> {

    // // @ts-ignore
    // if (!req.params.id) {
    //     id = res.locals.userId;
    // }
    const id: number = res.locals.userId;

    // @ts-ignore
    return res.status(200).send({
        user: await UserModelObj.getUserById(id)
    })
};

export const updateUserHandler: ExpressHandler<UpdateUserRequest, UpdateUserResponse> = async (req, res)=> {

    const { name, username, email } = req.body;

    //TODO get user id from jwt token
    // @ts-ignore
    const id: number = res.locals.userId;

    const user: User = {
        name,
        email,
        username,
    }

    await UserModelObj.updateUser(id, user);
    const userObj: any = await UserModelObj.getUserById(id);

    return res.status(200).send({
        message: 'updated successfully',
        user: userObj
    });
}

export const deleteUserHandler: ExpressHandler<DeleteUserRequest, DeleteUserResponse> = async (req, res)=> {
    // @ts-ignore
    const id: number = res.locals.userId;
    const userObj = await UserModelObj.deleteUser(id);

    return res.status(200).send({
        message: 'delete successfully'
    })
};