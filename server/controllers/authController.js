const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.login = async (req, res) => {

    // Find user
    try {
        const user = await User.findOne({ userName: req.body.userName });

        if (!user) {
            return res.status(404).send('User not found or incorrect password');
        }
        
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatches) {
            const accessToken = jwt.sign(
                {
                    "sub": String(user._id),
                    "role": user.role
                },
                config.access_token_secret,
                { expiresIn: '5m'}
            );

            const refreshToken = jwt.sign(
                {
                    "sub": String(user._id),
                    "role": user.role
                },
                config.refresh_token_secret,
                { expiresIn: '7d'}
            );

            user.refreshToken = refreshToken;

            await user.save();

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                /* secure: process.env.NODE_ENV === 'production' */
                sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                maxAge: 1 * 60 * 1000 // 1 mins
            });

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                /* secure: process.env.NODE_ENV === 'production' */
                sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                maxAge: 7 * 24 * 60 * 60 * 1000     // 7 Days
            })

            return res.sendStatus(200);

        } else {
            return res.status(401).send('User not found or incorrect password');
        }
    } catch (error) {
        return res.status(400).send(`Internal Server Error: "${error}"`)
    }
}


exports.register = async (req, res) => {
    try {
        // Encrypt password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(
            {
                userName: req.body.userName,
                salt: salt,
                hashedPassword: hashedPassword
            }
        );

        const newUser = new User(
            {
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email
        }
        );
        // Attempt to insert to db
        await newUser.save();

        return res.status(200).send(
            {
                "message": `Account ${newUser.userName} was created`
            }
        );
    } catch (error) {
        return res.status(400).send(`Internal Server Error: "${error}"`);
    }
}


/**
 * This function 'logout' logs people out of their account by deleting the refresh token associated with his / her specific account
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
exports.logout = async (req, res) => {
    try {
        // Get refresh token from cookies
        const { refresh_token: refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found." });
        }

        // Invalidate the refresh token (remove it from the database)
        await User.updateOne(
            { refreshToken: refreshToken }, 
            { $unset: { refreshToken: 1 } } // Remove the refresh token
        );

        // Clear cookies (remove tokens from the client)
        res.clearCookie('access_token', { httpOnly: true, sameSite: 'Lax' });
        res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'Lax' });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
}