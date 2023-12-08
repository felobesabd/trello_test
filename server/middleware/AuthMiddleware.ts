import {ExpressHandler} from "../types";
import {verifyJwt} from "../auth";
import {UserModelObj} from "../database/sql/UserModel";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(404);
    }

    try {
        const payload = verifyJwt(token)
        const user = await UserModelObj.getUserById(payload.userId)
        if (!user) {
            throw 'not user found'
        }

        res.locals.userId = user.id
        next();

    } catch {
        return res.status(401).send({error: 'bad request'})
    }

}