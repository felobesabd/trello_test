import {User} from "../../types";
import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/ValidatorMiddleware";
import slugify from "slugify";

export type SignUpRequest = Pick<User, 'name' | 'username'| 'email'| 'password'>

export interface SignInRequest {
    login: string;
    password: string;
}

export const signUpValidator = [
    check('name')
        .notEmpty()
        .withMessage('User Name required')
        .isLength({ min: 3 })
        .withMessage('Too short User name'),

    check('username')
        .notEmpty()
        .withMessage('Username required')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .custom((val, { req }) => {
            req.body.username = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
];

export const signInValidator = [
    check('login')
        .notEmpty()
        .withMessage('login required'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
];