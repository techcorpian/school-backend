import { pool } from '../config/db.config.js';

class Dashboard {

    static getActiveStudents(){
        return new Promise((resolve, reject) => {
          const sql = `SELECT count(*) AS count FROM students WHERE blockstatus = 0 AND deletestatus = 0;`
          pool.query(sql, [], (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }

    static getInactiveStudents(){
        return new Promise((resolve, reject) => {
          const sql = `SELECT count(*) AS count FROM students WHERE blockstatus = 1 AND deletestatus = 0;`
          pool.query(sql, [], (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }

    static getTotalStudents(){
        return new Promise((resolve, reject) => {
          const sql = `SELECT count(*) AS count FROM students WHERE deletestatus = 0;`
          pool.query(sql, [], (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }

        static getActivityLog(){
        return new Promise((resolve, reject) => {
          const sql = `SELECT a.*, u.username FROM activity_log a LEFT JOIN users u ON u.id = a.created_by;`
          pool.query(sql, [], (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }

}

export default Dashboard;