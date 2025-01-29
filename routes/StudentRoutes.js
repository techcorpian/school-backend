import express from 'express';
const router = express.Router();

import { getStudent, insertStudents, deleteStudent, getStudentById, updateStudent } from '../controllers/StudentController.js';

router.get('/get',getStudent);
router.post('/insert',insertStudents);
router.get('/getbyid/:id',getStudentById);
router.put('/delete/:id', deleteStudent);
router.put('/update/:id', updateStudent);

export default router