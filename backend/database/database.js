const { Pool } = require("pg");
const { config } = require("dotenv");
const fs = require("fs");
const path = require("path");

config();

const caCertPath = path.resolve(__dirname, 'ca.pem');

const pool = new Pool({ 
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(caCertPath).toString()
  }
});

module.exports = {
  pool
};