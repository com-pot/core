import e from "express";

export default class SignController {
    private attempts: number;

    public constructor() {
        this.attempts = 0;
    }

    public useCredentials(_req: e.Request, _res: e.Response, next: e.NextFunction) {
        this.attempts++;
        if(this.attempts % 2 === 0) {
            throw new Error(`Not implemented, lol ${this.attempts}`);
        }

        next();
    }
}
