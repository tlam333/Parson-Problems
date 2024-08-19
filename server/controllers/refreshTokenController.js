const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.handleRefreshToken = async (req, res) => {

    try {
        // Check for refresh token in request
        const cookies = req.cookies;
        if (!cookies?.refresh_token) {
            res.sendStatus(401);
        }
        
        const refreshToken = cookies.refresh_token;

        // Retrieve user by refresh token from db
        const user = await User.findOne({ refreshToken : refreshToken });

        // If no user found, tokens may have been tampered with
        if (!user) {
            res.sendstatus(403);
        }

        // If user found convert object id to string (For comparison with 'decoded.id')
        const userId = user._id.toString();

        jwt.verify(
            refreshToken,
            config.refresh_token_secret,
            (error, decoded) => {
                if (error || userId !== decoded.id) {
                    return res.sendStatus(403);
                }

                const accessToken = jwt.sign(
                    { "id": user._id },
                    config.access_token_secret,
                    { expiresIn: "5m" }
                );
                
                console.log(`New Access Token: ${accessToken}`);
                
                res.cookie('access_token', accessToken, {
                    httpOnly: true,
                    /* secure: process.env.NODE_ENV === 'production' */
                    sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                    maxAge: 5 * 60 * 1000 // 5 mins
                });
            }
        )
        res.sendStatus(200);
        
    } catch (error) {
        res.status(400).send(`Internal Server Error: "${error}"`)
    }
}