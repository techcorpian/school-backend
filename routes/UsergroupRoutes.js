import express from 'express';
const router = express.Router();

import { getUsergroup, insertUsergroup } from '../controllers/UsergroupController.js';

router.post('/insert',insertUsergroup);
router.get('/get',getUsergroup);

export default router