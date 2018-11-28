import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { User, UserType } from '../models/User';
import { default as User, UserModel } from "../models/User";

// const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<UserModel, string>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser<UserModel, string>((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user ? user : undefined); // todo: find better de-null-ification
    });
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
    User.findOne({email: email.toLowerCase()}, (err: any, user: any) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, {message: `Email ${email} not found.`});
        }
        user.comparePassword(password, (cErr: Error, isMatch: boolean) => {
            if (cErr) {
                return done(cErr);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, {message: "Invalid email or password."});
        });
    });
}));


export const instance = passport;

export default {
    instance
};
