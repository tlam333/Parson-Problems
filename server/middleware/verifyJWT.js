const config = require('../config/config');
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    
    const cookies = req.cookies;
    if (!cookies?.access_token) {
        return res.sendStatus(401);
    }

    const accessToken = cookies.access_token;


    jwt.verify(
        accessToken,
        config.access_token_secret,
        (error, decoded) => {
            if (error) return res.sendStatus(403);
            
            console.log(decoded);

            req.sub = decoded.sub;
            req.role = decoded.role;
            next();
        }
    );
};

module.exports = verifyJWT;