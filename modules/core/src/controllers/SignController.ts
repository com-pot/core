import e from "express";

export default class SignController {
    private attempts: number;

    public constructor() {
        this.attempts = 0;
    }

    public useCredentials(req: e.Request) {
        this.attempts++;

        if (req.user) {
            return "Signed already";
        }

        if (this.attempts % 2 === 0) {
            throw new Error(`Not implemented, lol ${this.attempts}`);
        }

        return "Sorta ok " + this.attempts;
    }

    public register(req: e.Request) {

    }
}
