/** 
 * Keep dotenv require in this folder and any db configuration
*/
require('dotenv').config();
const db = require('./db');

module.exports = {
    port: process.env.PORT,
    db: db
}