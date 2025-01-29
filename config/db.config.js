import mysql from 'mysql2'
import * as dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    port: 3306,
    connectTimeout: 20000,  // Increase timeout
    multipleStatements: true,
    ssl: { rejectUnauthorized: false }
  });

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Successfully connected to the database.');
    connection.release(); // Release the connection back to the pool
  });

export default pool;