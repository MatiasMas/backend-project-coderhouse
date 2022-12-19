import {Strategy as LocalStrategy} from "passport-local";
import {UsersModel} from "../models/users.model.js";
import bcrypt from "bcrypt";

export const setPassport = (passport) => {
    passport.use(
        new LocalStrategy((username, password, done) => {
            UsersModel.findOne({username: username}, (err, user) => {
                if (err) throw err;

                if (!user) return done(null, false);

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;

                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    });

    passport.deserializeUser((id, cb) => {
        UsersModel.findOne({_id: id}, (err, user) => {
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        });
    });

    //From the course diapositives
    // passport.use("login", new LocalStrategy(async (username, password, done) => {
//         await UsersModel.findOne({username}, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//
//             if (!user) {
//                 return done(null, false);
//             }
//
//             if (!isPasswordValid(user, password)) {
//                 console.log("Invalid Password.");
//                 return done(null, false);
//             }
//
//             return done(null, user);
//         });
//     }
// ));
//
// passport.use("signup", new LocalStrategy({passReqToCallback: true},
//     async (req, username, password, done) => {
//         await UsersModel.findOne({username}, async (err, user) => {
//             if (err) {
//                 console.log("Error on register.");
//                 return done(err);
//             }
//
//             if (user) {
//                 console.log("User already exists.");
//                 return done(null, false);
//             }
//
//             await UsersModel.create(structureUser(username, password), (err, userWithId) => {
//                 if (err) {
//                     console.log("Error when saving user in database.");
//                     return done(err);
//                 }
//
//                 console.log("User has been registered.");
//                 return done(null, userWithId);
//             });
//         });
//     }));
};