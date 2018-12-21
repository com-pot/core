import e from "express";

import { UserModel } from "../models/User";

export class Authenticator {
    public async findUserByToken(req: e.Request, _res: e.Response, next: e.NextFunction) {
        const token = req.query.token || req.headers["x-user-token"];
        if (!token) {
            req.user = undefined;
            return next();
        }


        // todo: actually fetch user
        req.user = {
            token: token,
            roles: [""],
            userRights: {
                additional: [],
                prohibited: []
            }
        };

        next();
    }
}

export default new Authenticator();
