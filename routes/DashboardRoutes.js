import express from 'express';
const router = express.Router();

import { getActiveStudents, getInactiveStudents, getTotalStudents, getActivityLog } from '../controllers/DashboardController.js';

router.get('/getactive',getActiveStudents);
router.get('/getinactive',getInactiveStudents);
router.get('/gettotal',getTotalStudents);
router.get('/getactivitylog',getActivityLog);


export default router