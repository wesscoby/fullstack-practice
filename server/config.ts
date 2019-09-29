import * as dotenv from 'dotenv'
dotenv.config();

interface Config {
    PORT: string
    SESSION_SECRET: string;
    LocalDB_URI: string
    ACCESS_TOKEN_SECRET: string
}

export const {
    PORT,
    SESSION_SECRET,
    LocalDB_URI,
    ACCESS_TOKEN_SECRET
}: Config = process.env as any;


