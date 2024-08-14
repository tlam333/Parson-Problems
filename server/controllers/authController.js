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
                { expiresIn: '30s'}
            );

            const refreshToken = jwt.sign(
                {"id": user._id},
                config.refresh_token_secret,
                { expiresIn: '1d'}
            );

            Object.assign(user,
                { refreshToken: refreshToken }
            );

            await user.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            res.send({ accessToken });

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