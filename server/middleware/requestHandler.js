const config = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');

    // Check for Request cookies
    if (req.cookies && Object.keys(req.cookies).length > 0) {

        // Extract cookies
        const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;

        try {
            // Verify access token
            const decoded = jwt.verify(
                accessToken,
                config.access_token_secret
            );
            
            // If token is valid attach req variables
            attachRequestVariables(true, req, decoded.sub, decoded.role);
            next();

        } catch (error) {
            
            // If user has no refresh token they shouldn't be logged in noshiiii
            if (!refreshToken) {
                //console.log("siggggg");
                return res.sendStatus(403);
                
            }


            const user = await User.findOne({ refreshToken: refreshToken });

            if (!user) {
                //console.log("sizzzzzzzzzzzz");
                return res.sendStatus(403);
            }
            
            // Create new access token
            const newAccessToken = jwt.sign(
                {
                    "sub": String(user._id),
                    "role": user.role
                },
                config.access_token_secret,
                { expiresIn: "20s" }
            );

            // Attach new access token to response cookie
            res.cookie('access_token', newAccessToken,
                {
                    httpOnly: true,
                    sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                    maxAge: 1 * 60 * 1000, // 1 mins
                    path: '/'
                }
            );
            // Attach req variables
            attachRequestVariables(true, req, String(user._id), user.role);
            next();
        } 
    } else {
        // No cookies so set as not logged in
        attachRequestVariables(false, req);
        next();
    }
}

/**
 * 
 * @param {Boolean} verified 
 * @param {Request} req
 * @param {String} sub
 * @param {String} role
 */
const attachRequestVariables = (verified, req, sub, role) => {
    console.log(`Verified: ${verified}`);
    console.log(`req.sub: ${sub}`);
    console.log(`req.role: ${role}`);
    if (verified) {
        
        req.sub = sub;
        req.role = role;
        req.login = true;
    } else {
        req.login = false;
    }
}