import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";

export type UserModel = mongoose.Document & {
    uniqueHandle: string;
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,

    facebook: string,
    tokens: AuthToken[],

    profile: {
        name: string,
        gender: string,
        location: string,
        website: string,
        picture: string
    },

    comparePassword: comparePasswordFunction,
    gravatar: (size: number) => string
};


type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string,
    kind: string
}

const userSchema = new mongoose.Schema({
    uniqueHandle: {type: String, unique: true},

    email: {type: String, unique: true},
    password: String,
    passwordResetExpires: Date,
    passwordResetToken: String,

    facebook: String,
    google: String,
    twitter: String,

    tokens: Array,

    profile: {
        gender: String,
        location: String,
        name: String,
        picture: String,
        website: String
    }
}, {timestamps: true});

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(this: UserModel, next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (bErr: mongoose.Error, hash) => {
            if (bErr) {
                return next(bErr);
            }
            this.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (this: UserModel, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model<UserModel>("User", userSchema);

export default User;