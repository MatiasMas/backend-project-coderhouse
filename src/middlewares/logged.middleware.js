export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("You are not logged in to access.");
    }
};