
export default interface LoginModel {
    token: string;
    userHandle: string;
    roles: string[];
    aclExceptions: {
        allow: string[],
        deny: string[]
    };
}
