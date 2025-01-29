import Student from '../models/StudentModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const insertStudents = (req, res) => {
  const { aadhaar_no, 
    enroll_no,
    not_applied, 
    name_aadhaar,
    id_name,
    dob,
    gender,
    bloodgroup,
    religion,
    social_cat,
    community,
    mother_tongue,
    disadv_groupname,
    disable_groupname,
    mother_name,
    father_name,
    gaurdian_name,
    father_occup,
    mother_occup,
    parent_annual_income,
    mobile,
    email,
    door_no,
    street,
    city,
    district,
    pincode,
    class_studying,
    section,
    prev_class,
    admission_no,
    doj,
    med_of_instruction,
    created_by} = req.body;

  // Validate input
  if (!aadhaar_no) {
    return res.status(400).send({ message: 'Student Name is Required!' });
  }

  // Store usergroup details in MySQL database
  const newStudent = new Student({ aadhaar_no,
    enroll_no,
    not_applied, 
    name_aadhaar,
    id_name,
    dob,
    gender,
    bloodgroup,
    religion,
    social_cat,
    community,
    mother_tongue,
    disadv_groupname,
    disable_groupname,
    mother_name,
    father_name,
    gaurdian_name,
    father_occup,
    mother_occup,
    parent_annual_income,
    mobile,
    email,
    door_no,
    street,
    city,
    district,
    pincode,
    class_studying,
    section,
    prev_class,
    admission_no,
    doj,
    med_of_instruction,
    created_by
   });
  Student.insertStudents(newStudent, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to create Student' });
      return;
    } 
    res.send(data);
  });
 
};

// Get all students
export const getStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const results = await Student.getStudent();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };

  export const getStudentById = async (req, res) => {
    try {
      const id = req.params.id;
      const results = await Student.getStudentById(id);
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };

  export const deleteStudent = async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = await Student.deleteStudent(id);
  
      // If no data is returned, the user may not have been found
      if (data.affectedRows === 0) {
        return res.status(404).send({
          message: `File with id ${id} not found.`,
        });
      }
  
      // Sending a success response
      res.send({
        message: 'File was deleted successfully!',
      });
    } catch (err) {
      // Handling errors and sending a response with an error message
      res.status(500).send({
        message: err.message || 'Failed to delete file.',
      });
    }
  };

  export const updateStudent = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const logData = {
      activity: 'Updated the student, '+req.body.id_name,
      created_by: req.body.updated_by,
    };
  
    try {
      // const newUser = new Student(id, newUser);
      const data = await Student.updateStudent(id, newUser, logData);
  
      // If no data is returned, the user may not have been found
      if (data.affectedRows === 0) {
        return res.status(404).send({
          message: `File with id ${id} not found.`,
        });
      }
  
      // Sending a success response
      res.send({
        message: 'File was deleted successfully!',
      });
    } catch (err) {
      // Handling errors and sending a response with an error message
      res.status(500).send({
        message: err.message || 'Failed to delete file.',
      });
    }
  };