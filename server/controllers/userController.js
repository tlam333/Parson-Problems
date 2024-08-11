const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    // Find user inside of the db
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