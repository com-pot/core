import e from "express";
import JarBase from "../../jar-base";
import { UserModel } from "./models/User";

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

        const signRouter = e.Router();
        signRouter.post("/in/credentials", this.action(signCtrl.useCredentials, signCtrl));
        signRouter.get("/up", this.action(signCtrl.register, signCtrl);

        router.use("/sign", signRouter);

        router.get("/add-user", this.action(async () => {

            const u = new UserModel();
            u.email = "asd";
            u.uniqueHandle = "pepera";

            await u.save();

            return u;
        }));

        router.get("/find-user", this.action(() => {
            const u = UserModel.find({
                email: "asd"
            });

            return u;
        }));
    }
}

interface CoreModuleOptions {
    credentials?: boolean;
}
