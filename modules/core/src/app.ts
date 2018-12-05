import e from "express";
import JarBase from "../../jar-base";
import logger from "./util/logger";
import config from "../config";
import mongoose from "mongoose";

import passportConfig from "./auth/passport";

const passport = passportConfig.instance;


// Create Express server
const app = JarBase.app.ExpressFactory.create();

// Connect to MongoDB
const mongoUrl = config.get<string>("mongo");

mongoose.Promise = Promise;
mongoose.connect(mongoUrl, {useMongoClient: true})
    .then(() => logger.info("Mongoose is ready to use"))
    .catch((err: any) => {
        logger.error("MongoDB connection error: " + err);
        // process.exit();
    });

app.use(passport.initialize());
app.use((req: e.Request, res: e.Response, next: e.NextFunction) => {
    res.locals.user = req.user;
    next();
});

import Authenticator from "./models/Authenticator";

app.use((new Authenticator()).findUserByToken);


import CoreModule from "./CoreModule";

const coreModule = new CoreModule();
coreModule.start({
    module: {
        credentials: true
    }
});
app.use(coreModule.getRouter());


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(JarBase.app.errorHandler());


export default app;
