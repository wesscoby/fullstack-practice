require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    LocalDB_URI: process.env.LocalDB_URI
}