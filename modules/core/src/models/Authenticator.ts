import e from "express";


export default class Authenticator {
    public findUserByToken(req: e.Request, _res: e.Response, next: e.NextFunction) {
        const token = req.query.token || req.headers["x-user-token"];
        if (!token) {
            req.user = undefined;
        } else {
            // todo: actually fetch user
            req.user = {
                token: token,
                roles: [""],
                userRights: {
                    additional: [],
                    prohibited: []
                }
            };
        }

        next();
    }
}
