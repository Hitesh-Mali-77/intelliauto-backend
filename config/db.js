// import mysql from "mysql";

// export const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "197726",
//   database: "automobiles",
// });

// connection.connect((error, result) => {
//   if (result) {
//     console.log("Connected to mySQL !!");
//   }
// });
// =================================================================
// import mysql from "mysql";

// export const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "root",
//   database: "automobiles",
// });

// connection.connect((error) => {
//   if (error) {
//     console.log("MySQL Connection Error:", error.message);
//   } else {
//     console.log("Connected to MySQL !!");
//   }
// });
// ==============================================================
// import mysql from "mysql";

// export const connection = mysql.createConnection({
//   host: "mysql.railway.internal",
//   port: "3306",
//   user: "root",
//   password: "PYTBqiQZMsnvjCOxJUqobrancfUyVuwM",
//   database: "railway",
// });

// connection.connect((error) => {
//   if (error) {
//     console.log("MySQL Connection Error:", error.message);
//   } else {
//     console.log("Connected to MySQL !!");
//   }
// });

import mysql from "mysql";

export const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  port: process.env.MYSQLPORT || "3306",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "PYTBqiQZMsnvjCOxJUqobrancfUyVuwM",
  database: process.env.MYSQLDATABASE || "railway",
});

connection.connect((error) => {
  if (error) {
    console.log("MySQL Connection Error:", error.message);
  } else {
    console.log("Connected to MySQL !!");
  }
});
