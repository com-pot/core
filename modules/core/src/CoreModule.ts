import e from "express";
import JarBase from "../../jar-base";

import logger from "./util/logger";

import SignController from "./controllers/SignController";

export default class CoreModule extends JarBase.app.JarModule {
    private controllers!: {
        sign: SignController
    };

    public start(options: { router?: e.RouterOptions, module: CoreModuleOptions }): any {
        if (!options || !options.module) {
            throw new Error("Auth module requires options");
        }

        super.start(options);

        this.controllers = {
            sign: new SignController()
        };

        this.useRouter(options && options.router);
    }

    protected registerRoutes(router: e.Router) {
        const signCtrl = this.controllers.sign;

        router.post("/sign/in/credentials", this.action(signCtrl.useCredentials, signCtrl));

        router.get("/blaze", this.action(signCtrl.blaze, signCtrl));

        router.get("/sign/in/asdf", this.action(() => {
            throw new Error("ASDF");
        }));

        router.get("/stats", (_req: e.Request, resp: e.Response) => {
            logger.info("Stats start");
            resp.send(JSON.stringify({
                succ: true
            }));
            logger.info("Stats sent");
        });
    }
}

interface CoreModuleOptions {
    credentials?: boolean;
}
