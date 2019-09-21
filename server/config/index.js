require('dotenv').config();


export const PORT = process.env.PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const LocalDB_URI = `${process.env.LocalDB_URI}/${process.env.DB_NAME}`;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
