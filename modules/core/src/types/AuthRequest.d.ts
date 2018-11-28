declare namespace Express {
    export interface Request extends AuthorizeRequest {
        identity?: Identity
    }

    export interface Identity {
        token: string;
        roles: ReadonlyArray<string>;
        userRights: {
            additional: ReadonlyArray<string>,
            prohibited: ReadonlyArray<string>
        };
    }
}

interface AuthorizeRequest {
    requiredResources: ReadonlyArray<string>;
}


