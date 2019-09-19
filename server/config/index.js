require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    LocalDB_URI: `${process.env.LocalDB_URI}/${process.env.DB_NAME}`,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}