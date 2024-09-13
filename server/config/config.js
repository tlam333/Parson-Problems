/** 
 * Keep dotenv require in this folder and any db configuration
*/
require('dotenv').config();
const db = require('./db');

module.exports = {
    port: process.env.PORT,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    ai_api_key: process.env.AI_API_KEY,
    db: db
}