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

    public blaze(req: e.Request, resp: e.Response) {
        resp.status(420);
        resp.statusMessage = "Enhance your calm";

        return {
            amount: 2 + (++this.attempts * 926) % 3 + ((6 * this.attempts) * 7) % 5,
            unit: "g"
        };
    }
}
