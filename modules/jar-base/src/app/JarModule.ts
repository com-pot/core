import * as e from "express";


/**
 * Module class which
 */
export default class JarModule {
    private _router?: e.Router;

    public start(options: object): any {
    }

    public getRouter(): e.Router {
        if (!this._router) {
            throw new ReferenceError("Router has not been instantiated yet");
        }

        return this._router;
    }

    protected useRouter(options: e.RouterOptions): e.Router {
        this._router = e.Router(options);
        this.registerRoutes(this._router);
        return this._router;
    }

    protected registerRoutes(router: e.Router) {
        throw new Error("Module must implement registerRoutes()");
    }
}

