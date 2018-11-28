// app

import ExpressFactory from "./src/app/ExpressFactory";
import JarModule from "./src/app/JarModule";
import errorHandler from "errorhandler";
// security
import AuthChecker from "./src/security/AuthChecker";
import ResourcePermission from "./src/security/ResourcePermission";

export const security = {
    AuthChecker,
    ResourcePermission
};

export const app = {
    ExpressFactory,
    JarModule,
    errorHandler
};

export default {
    app,
    security
};
