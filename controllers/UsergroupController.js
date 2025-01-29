import Usergroup from '../models/UsergroupModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const insertUsergroup = (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).send({ message: 'Usergroup Name is Required!' });
  }

  // Store usergroup details in MySQL database
  const newUsergroup = new Usergroup({ name });
  Usergroup.insertUsergroup(newUsergroup, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to create user' });
      return;
    } 
    res.send(data);
  });
 
};

// Get all files
export const getUsergroup = async (req, res) => {
    try {
      const id = req.params.id;
      const results = await Usergroup.getUsergroup();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };