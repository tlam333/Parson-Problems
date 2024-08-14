const User = require('../models/user');

exports.getUser = async (req, res) => {
    //verifyUser(req);
    res.send(`Retrieved user info for id: ${req.params.id}`);
}

exports.updateUser = async (req, res) => {
    res.send(`Updated user info for id: ${req.params.id}`);
}

exports.deleteUser = async (req, res) => {
    res.send(`Deleted user info for id: ${req.params.id}`);
}
/**
 * 
 * @param {Express.Request} req 
 */
/*
const verifyUser = (req) => {
    const paramId = req.params.id;
    const reqId = req.id;

    console.log(`paramId = ${paramId}\nreqId = ${reqId}`);
}*/