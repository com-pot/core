import * as e from "express";
import ResourcePermission from "./ResourcePermission";

export default class AuthChecker {
    private readonly unprotectedPermissions: ResourcePermission[];

    public constructor(tokenLessResources: ResourcePermission[]) {
        this.unprotectedPermissions = [];
        this.unprotectedPermissions.push.apply(this.unprotectedPermissions, tokenLessResources);
    }


    public protect(permissions: ResourcePermission[]): e.Handler {
        return (req: e.Request) => {
            const params = req.params || {};

            // if every required resource is token-less
            const missingResources = permissions.filter((res) => {
                if (this.unprotectedPermissions.indexOf(res) >= 0) {
                    return false;
                }

                return true;
            });

            if (missingResources) {
                return Promise.reject(new Error());
            }

            return Promise.resolve();
        };
    }
}
