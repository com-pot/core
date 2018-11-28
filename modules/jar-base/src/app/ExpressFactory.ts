import express, { Express } from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";

import lusca from "lusca";

export default class ExpressFactory {

    static create(): Express {
        const app = express();

        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(lusca.xframe("SAMEORIGIN"));
        app.use(lusca.xssProtection(true));

        return app;
    }
}
