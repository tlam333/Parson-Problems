const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = {uri, options};