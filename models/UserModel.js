import { pool } from '../config/db.config.js';

class User {
  constructor(user) {
    this.username = user.username;
    this.phone = user.phone;
    this.email = user.email;
    this.usergroup_id = user.usergroup_id;
    this.designation = user.designation;
    this.password = user.password;
    this.created_by = user.created_by;

  }

  static insertUser(newUser, logData, result) {
    // Store file details in MySQL database
    pool.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newUser });

    });

    pool.query('INSERT INTO master_log SET ?', logData, (err, res) => {
      if (err) {
        console.error('Error inserting log data:', err);
        return reject(err);
      }

    });
  }

  static deleteUser(fileId) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET deletestatus = "1" WHERE id = ?', [fileId], (err, res) => {
        if (err) {
          console.error('Error deleting file:', err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static updateUser(id, newUser, logData) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET username = ?, phone = ?, email = ?, usergroup_id = ?, designation = ? WHERE id=?', [newUser.username, newUser.phone, newUser.email, newUser.usergroup_id, newUser.designation, id], (err, res) => {
        if (err) {
          console.error('Error updating user:', err);
          return reject(err);
        } else {
          resolve(res);
        }
      });

      pool.query('INSERT INTO master_log SET ?', logData, (err, res) => {
        if (err) {
          console.error('Error inserting log data:', err);
          return reject(err);
        }
        resolve(res);
      });

    });
  }

  static getUser() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT u.*, ug.name
          FROM users u
          LEFT JOIN usergroups ug
          ON u.usergroup_id = ug.id WHERE u.deletestatus = 0;`
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

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT u.*, ug.name
        FROM users u
        LEFT JOIN usergroups ug
        ON u.usergroup_id = ug.id WHERE u.deletestatus = 0 AND u.id = ?;`
      pool.query(sql, [id], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getPasswordById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, password
      FROM users WHERE email = ?;`
      pool.query(sql, [id], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getUsergroups() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM usergroups WHERE deletestatus = 0;`
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

  static updatePassword(id, newPass, logData) {
    return new Promise((resolve, reject) => {
      console.log(newPass); 
      pool.query('UPDATE users SET password = ? WHERE id=?', [newPass.password, id], (err, res) => {
        if (err) {
          console.error('Error updating user:', err);
          return reject(err);
        } else {
          resolve(res);
        }
      });

      pool.query('INSERT INTO master_log SET ?', logData, (err, res) => {
        if (err) {
          console.error('Error inserting log data:', err);
          return reject(err);
        }
        resolve(res);
      });

    });
  }

  static updateForgotPassword(id, newPass, logData) {
    return new Promise((resolve, reject) => {
      console.log(newPass); 
      pool.query('UPDATE users SET password = ? WHERE id=?', [newPass.password, id], (err, res) => {
        if (err) {
          console.error('Error updating user:', err);
          return reject(err);
        } else {
          resolve(res);
        }
      });

      pool.query('INSERT INTO master_log SET ?', logData, (err, res) => {
        if (err) {
          console.error('Error inserting log data:', err);
          return reject(err);
        }
        resolve(res);
      });

    });
  }

}


export default User;