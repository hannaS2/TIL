
const dotenv = require("dotenv");

// Load environment variable from .env file
dotenv.config();

// "publish": "NODE_ENV=production node server.js", 추가하면 npm run publish로 돌리면 production모드로
const env = process.env.NODE_ENV || "development";  // 앞의 것이 null이면 뒤의 값으로(short-circuit)
console.log(env);

const configs = {
    base: {
        env,
        name: process.env.APP_NAME || "sample-api",
        host: process.env.APP_HOST || "0.0.0.0",
        port: process.env.APP_PORT || 3000,
        jwtSecret: process.env.JWT_SECRET
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            name: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    development: {
        database: {
            host: process.env.DB_HOST_DEV,
            port: process.env.DB_PORT_DEV,
            name: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    }
}

module.exports = {
    ...configs.base,
    ...configs[env]
};