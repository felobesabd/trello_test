import {User} from "../../types";
import {check} from "express-validator";
import slugify from "slugify";
import {validatorMiddleware} from "../../middleware/ValidatorMiddleware";

export type UpdateUserRequest = Pick<User, 'name' | 'username'| 'email'>

export const updateUserValidator = [
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

    validatorMiddleware,
];