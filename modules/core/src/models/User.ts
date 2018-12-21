import bcrypt from "bcrypt";
import { instanceMethod, pre, prop, Typegoose } from "typegoose";
import mongooseConnection from "../util/mongooseConnection";

@pre<User>("save", function preSave(next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(this.password, salt, (bErr: Error, hash) => {
            if (bErr) {
                return next(bErr);
            }
            this.password = hash;
            next();
        });
    });
})

export class User extends Typegoose {
    @prop({required: true, unique: true, index: true})
    uniqueHandle: string;
    @prop()
    email: string;
    @prop()
    password: string;
    @prop()
    passwordResetToken: string;
    @prop()
    passwordResetExpires: Date;

    @prop()
    facebook: string;
    @prop()
    tokens: AuthToken[];

    @prop()
    profile: {
        name: string,
        gender: string,
        location: string,
        website: string,
        picture: string
    };

    constructor(...args: any[]) {
        super();
    }

    @instanceMethod
    comparePassword(candidatePassword: string, cb: (err: any, isMatch: any) => void) {
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
            cb(err, isMatch);
        });
    }
}


interface AuthToken {
    accessToken: string;
    kind: string;
}

export const UserModel = new User().getModelForClass(User, {
    existingConnection: mongooseConnection
});
