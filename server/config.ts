import * as dotenv from 'dotenv'
dotenv.config();

import { Config } from './types';

export const {
    PORT,
    SESSION_SECRET,
    LocalDB_URI,
    ACCESS_TOKEN_SECRET
}: Config = process.env as any;


