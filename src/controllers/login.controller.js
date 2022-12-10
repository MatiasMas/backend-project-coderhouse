export const loginUser = (req, res) => {
    const {username} = req.query;


    if (req.session.username) {
        res.status(200).json(true);
    } else {
        if (username) {
            req.session.username = username;
            res.status(200).json(true);
        } else {
            res.send(401).json(false);
        }
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.send(200).json("Session finished.");
};