import e from "express";
import JarBase from "../../jar-base";

import passportFactory from "./auth/PassportFactory";
import authenticator from "./auth/Authenticator";
import CoreModule from "./CoreModule";

const passport = passportFactory.getInstance();


// Create Express server
const app = JarBase.app.ExpressFactory.create();

app.use(passport.initialize());
app.use((req: e.Request, res: e.Response, next: e.NextFunction) => {
    res.locals.user = req.user;
    next();
});

app.use(authenticator.findUserByToken);

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
