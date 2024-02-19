// connection.js
const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE, DB_PORT, POSTGRES_URLD } = require("../config/envConfig");
const pg = require('pg');
const { Pool } = require('pg');
// const { POSTGRES_URLD } = require("../config/envConfig");

const pool = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    port: DB_PORT
});



// const { Pool } = pg;

// const db = new Pool({
//     connectionString: POSTGRES_URLD,
//     connectionTimeoutMillis: 5000 // Adjust the timeout value as needed
// });

// const pool = new Pool({
//     connectionString: POSTGRES_URLD,
//     connectionTimeoutMillis: 5000 // Adjust the timeout value as needed
// });


pool.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = { pool };
