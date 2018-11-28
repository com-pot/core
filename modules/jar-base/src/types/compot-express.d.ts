declare namespace express {
    export interface Request extends AuthorizeRequest {

    }
}

interface AuthorizeRequest {
    permissions: string[];
}



