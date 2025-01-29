import { pool } from '../config/db.config.js';

class Usergroup {
  constructor(usergroup) {
    this.name = usergroup.name;

  }

  static insertUsergroup(newUsergroup, result) {
    // Store file details in MySQL database
    pool.query('INSERT INTO usergroups SET ?', newUsergroup, (err, res) => {
      if (err) {
        console.error('Error inserting usergroup into database:', err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newUsergroup });

    });
  }

  static getUsergroup() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usergroups';
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

export default Usergroup;