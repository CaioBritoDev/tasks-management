const { Pool } = require('pg');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');

config(); // Load environment variables from .env file

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  ssl: isProduction ? {
    rejectUnauthorized: true,
    ca: process.env.CERTIFICATE // Use environment variable for production
  } : {
    rejectUnauthorized: false, // Typically false for development (or as needed)
    ca: fs.readFileSync(path.resolve(__dirname, 'ca.pem')).toString() // Use file in local dev
  }
});

module.exports = {
  pool
};
