const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.login = async (req, res) => {

    // Find user
    try {
        const user = await User.findOne({ userName: req.body.userName });

        if (!user) {
            res.status(404).send('User not found or incorrect password');
        }
        
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatches) {
            const accessToken = jwt.sign(
                {"id": user._id},
                config.access_token_secret,
                { expiresIn: '5m'}
            );

            const refreshToken = jwt.sign(
                {"id": user._id},
                config.refresh_token_secret,
                { expiresIn: '7d'}
            );

            Object.assign(user,
                { refreshToken: refreshToken }
            );

            await user.save();

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                /* secure: process.env.NODE_ENV === 'production' */
                sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                maxAge: 5 * 60 * 1000 // 5 mins
            });

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                /* secure: process.env.NODE_ENV === 'production' */
                sameSite: 'Lax',    // To prevent CSRF (Cross Site Reqest Forgery)
                maxAge: 7 * 24 * 60 * 60 * 1000     // 7 Days
            })

            res.sendStatus(200);

        } else {
            res.status(401).send('User not found or incorrect password');
        }
    } catch (error) {
        res.status(400).send(`Internal Server Error: "${error}"`)
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

        res.status(201).send(
            {
                userName: req.body.userName,
                salt: salt,
                hashedPassword: hashedPassword
            }
        );
    } catch (error) {
        res.status(400).send(`Internal Server Error: "${error}"`);
    }
}


/**
 * This function 'logout' logs people out of their account by deleting the refresh token associated with his / her specific account
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
exports.logout = async (req, res) => {
    try {
        const cookies = req.cookies;

        // Check if request contains the cookie with the user's refresh token
        if (!cookies?.refresh_token) {
            res.sendStatus(401);
        }

        const refreshToken = cookies.refresh_token;

        const user = await User.findOne({ refreshToken: refreshToken });

        // Tampered token or user already logged out as there is no Token
        if (!user) {
            res.sendStatus(403);
        }

        const userId = user._id.toString();

        // Verify JWT against 'refresh_token_secret'
        jwt.verify(
            refreshToken,
            config.refresh_token_secret,
            (error, decoded) => {

                // If error occurs or if found 'userId' is not equal to the JWT 'id' then user is not authenticated (can't log out if you're not logged in already and you can't log out other users duhhhhhh)
                if (error || userId !== decoded.id) {
                    
                    console.log(`User:\n\n${decoded.id}\n${user.userName}\n\nIs now logged out`);

                    return res.sendStatus(403);
                }
            }
        )

    } catch (error) {
        res.status(500).send(`Internal Server Error: "${error}"`);
    }
}