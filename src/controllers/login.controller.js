import {currentPassport} from "../server.js";

export const loginUser = (req, res, next) => {
    currentPassport.authenticate("local", (err, user) => {
        if (err) throw err;

        if (!user) res.status(404).send("The user does not exist.");

        req.logIn(user, (err) => {
            if (err) throw err;

            res.status(200).send("Logged in successfully.");
            console.log(req.user);
        });

    })(req, res, next);
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.send(200).json("Session finished.");
};