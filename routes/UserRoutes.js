import express from 'express';
const router = express.Router();

import { getUser, insertUser, getUsergroups, getUserById, deleteUser, updateUser, getPasswordById, updatePassword, updateForgotPassword } from '../controllers/UserController.js';

router.post('/insert',insertUser);
router.get('/get',getUser);
router.get('/getbyid/:id',getUserById);
router.get('/getug',getUsergroups);
router.put('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);
router.put('/updatepassword/:id', updatePassword);
router.put('/updateforgotpassword/:id', updateForgotPassword);
router.get('/getpassword/:id',getPasswordById);





export default router