import { pool } from '../config/db.config.js';

class Student {
  constructor(student) {
    this.aadhaar_no = student.aadhaar_no;
    this.enroll_no = student.enroll_no;
    this.not_applied = student.not_applied; 
    this.name_aadhaar = student.name_aadhaar;
    this.id_name = student.id_name;
    this.dob = student.dob;
    this.gender = student.gender;
    this.bloodgroup = student.bloodgroup;
    this.religion = student.religion;
    this.social_cat = student.social_cat;
    this.community = student.community;
    this.mother_tongue = student.mother_tongue;
    this.disadv_groupname = student.disadv_groupname;
    this.disable_groupname = student.disable_groupname;
    this.enroll_no = student.enroll_no,
    this.not_applied = student.not_applied, 
    this.name_aadhaar = student.name_aadhaar,
    this.id_name = student.id_name,
    this.dob = student.dob,
    this.gender = student.gender,
    this.bloodgroup = student.bloodgroup,
    this.religion = student.religion,
    this.social_cat = student.social_cat,
    this.community = student.community,
    this.mother_tongue = student.mother_tongue,
    this.disadv_groupname = student.disadv_groupname,
    this.disable_groupname = student.disable_groupname,
    this.mother_name = student.mother_name,
    this.father_name = student.father_name,
    this.gaurdian_name = student.gaurdian_name,
    this.father_occup = student.father_occup,
    this.mother_occup = student.mother_occup,
    this.parent_annual_income = student.parent_annual_income,
    this.mobile = student.mobile,
    this.email = student.email,
    this.door_no = student.door_no,
    this.street = student.street,
    this.city = student.city,
    this.district = student.district,
    this.pincode = student.pincode,
    this.class_studying = student.class_studying,
    this.section = student.section,
    this.prev_class = student.prev_class,
    this.admission_no = student.admission_no,
    this.doj = student.doj,
    this.med_of_instruction = student.med_of_instruction,
    this.created_by = student.created_by

  }

  static insertStudents(newStudent, result) {
    // Store file details in MySQL database
    pool.query('INSERT INTO students SET ?', newStudent, (err, res) => {
      if (err) {
        console.error('Error inserting student into database:', err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newStudent });

    });
  }

  static updateStudent(id, newUser, logData) {
    return new Promise((resolve, reject) => {
      const { created_at, updated_at, ...updateData } = newUser;
      pool.query("UPDATE students SET ? WHERE id = ?", [updateData, id], (err, res) => {
        if (err) {
          console.error('Error deleting file:', err);
          reject(err);
        } else {
          resolve(res);
        }
      });

      pool.query('INSERT INTO activity_log SET ?', logData, (err, res) => {
        if (err) {
          console.error('Error inserting log data:', err);
          return reject(err);
        }
        resolve(res);
      });

      
    });
  }

    static getStudent(){
        return new Promise((resolve, reject) => {
          const sql = `SELECT * FROM students WHERE deletestatus = 0;`
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

    static getStudentById(id){
      return new Promise((resolve, reject) => {
        const sql = `SELECT *
        FROM students WHERE deletestatus = 0 AND id = ?;`
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

    static deleteStudent(fileId) {
      return new Promise((resolve, reject) => {
        pool.query('UPDATE students SET deletestatus = "1" WHERE id = ?', [fileId], (err, res) => {
          if (err) {
            console.error('Error deleting file:', err);
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }

}

export default Student;