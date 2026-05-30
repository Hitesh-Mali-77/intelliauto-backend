import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  port: process.env.MYSQLPORT || "3306",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "PYTBqiQZMsnvjCOxJUqobrancfUyVuwM",
  database: process.env.MYSQLDATABASE || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log("MySQL Connection Error:", err.message);
  } else {
    console.log("Connected to MySQL !!");
    conn.release();
  }
});

export { pool as connection };
