const config = require('../config/config');
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    console.log(authHeader);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        config.access_token_secret,
        (error, decoded) => {
            if (error) return res.sendStatus(403);

            req.id = decoded.id;
            next();
        }
    );
};

module.exports = verifyJWT;