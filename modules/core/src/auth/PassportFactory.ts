import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { User, User } from '../models/User';
import { User, UserModel } from "../models/User";

// const FacebookStrategy = passportFacebook.Strategy;

export class PassportFactory {
    public options: {
        useCredentials?: boolean
    } = {};
    private instance: passport.Authenticator = undefined;


    public getInstance(): passport.Authenticator {
        if (!this.instance) {
            this.instance = this.createInstance();
        }

        return this.instance;
    }

    private createInstance(): passport.Authenticator {
        const authenticator = new passport.Passport();

        passport.serializeUser<User, string>((user, done) => {
            done(undefined, user.id);
        });

        passport.deserializeUser<User, string>((id, done) => {
            UserModel.findById(id, (err, user) => {
                done(err, user ? user : undefined); // todo: find better de-null-ification
            });
        });


        if (this.options.useCredentials) {
            /**
             * Sign in using Email and Password.
             */
            passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
                UserModel.findOne({email: email.toLowerCase()}, (err: any, user: any) => {
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
        }

        return authenticator;
    }
}

export default new PassportFactory();
