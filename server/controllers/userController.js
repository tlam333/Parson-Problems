const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });

        // If user exists check if the password matches
        if (user) {
            try {
                // Compare incoming password to the password stored in the DB
                if (await bcrypt.compare(req.body.password, user.password)) {

                }
            } catch (error) {
        }
        }
        else {
            res.status(404).send("User not found");
        }
        res.status(200).json(user); // Return jwt with user info and what not
    } catch (error) {
        res.status(400).send(`Internal Server Error: "${error}"`);
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
        )
        // Attempt to insert to db
        /*await User.save(
            {
                userName: req.body.userName,
                password: hashedPassword
            }
        );*/
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