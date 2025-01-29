import Dashboard from '../models/DashboardModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Get all active students
export const getActiveStudents = async (req, res) => {
    try {
      const results = await Dashboard.getActiveStudents();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };

  // Get all active students
export const getInactiveStudents = async (req, res) => {
    try {
      const results = await Dashboard.getInactiveStudents();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };


  // Get total students
export const getTotalStudents = async (req, res) => {
    try {
      const results = await Dashboard.getTotalStudents();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };

  export const getActivityLog = async (req, res) => {
    try {
      const results = await Dashboard.getActivityLog();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };