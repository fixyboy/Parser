import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, "/../../.env")});

export default {
    logDir: process.env.LOG_DIR || './logs',
    env: process.env.NODE_ENV || 'development',
    secret: process.env.secret || 'default secret'
}