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

    protected action(action: e.Handler, actionInstance?: any): e.Handler {

        return async function (req: e.Request, resp: e.Response, next: e.NextFunction) {
            try {
                const result = await action.call(actionInstance, req, resp);

                if (!result) {
                    return next(new Error("No controller response"));
                }

                // todo: more controller handling?

                resp.send(JSON.stringify(result));
            } catch (e) {
                return next(e);
            }
        };
    }
}

