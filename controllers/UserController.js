import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Insert Users
export const insertUser = (req, res) => {
  const { username, phone, email, usergroup_id, designation, password, conpassword, created_by } = req.body;

  // Validate input
  if (!username) {
    return res.status(400).send({ message: 'Folder Name is Required!' });
  }else if(!phone){
    return res.status(400).send({ message: 'Phone Number is Required!' });
  }else if(password != conpassword){
    return res.status(400).send({ message: 'password mismatching!' });
  }

  // Store folder details in MySQL database
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, phone, email, usergroup_id, designation, created_by, password: hashedPassword });
  const logData = {
    activity: 'Inserted the user, '+username,
    created_by: created_by,
  };
  User.insertUser(newUser, logData, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to create user' });
      return;
    } 
    res.send(data);
  });
 
};

// Get all users
export const getUser = async (req, res) => {
    try {
      const results = await User.getUser();
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };

  // Get all users by id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await User.getUserById(id);
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }

};

  // Get all users by id
  export const getPasswordById = async (req, res) => {
    try {
      const id = req.params.id;
      const results = await User.getPasswordById(id);
      res.json(results);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  
  };


  // Get all usergroups
export const getUsergroups = async (req, res) => {
  try {
    const results = await User.getUsergroups();
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }

};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.deleteUser(id);

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

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, phone, email, usergroup_id, designation, updated_by } = req.body;

  try {
    const newUser = new User({ username, phone, email, usergroup_id, designation, updated_by});
    console.log(newUser);

    const logData = {
      activity: 'Updated the user, '+username,
      created_by: updated_by,
    };
    const data = await User.updateUser(id, newUser, logData);

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

export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const {username, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newPass = new User({ password:hashedPassword });
    console.log(newPass);

    const logData = {
      activity: 'Updated the Password For '+username,
      created_by: id,
    };

    const data = await User.updatePassword(id, newPass, logData);

    // If no data is returned, the user may not have been found
    if (data.affectedRows === 0) {
      return res.status(404).send({
        message: `File with id ${id} not found.`,
      });
    }

    // Sending a success response
    res.send({
      message: 'File was Updated successfully!',
    });
  } catch (err) {
    // Handling errors and sending a response with an error message
    res.status(500).send({
      message: err.message || 'Failed to Update file.',
    });
  }
};

export const updateForgotPassword = async (req, res) => {
  const id = req.params.id;
  const {email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newPass = new User({ password:hashedPassword });
    console.log(newPass);

    const logData = {
      activity: 'Updated the Password For '+email,
      created_by: id,
    };

    const data = await User.updatePassword(id, newPass, logData);

    // If no data is returned, the user may not have been found
    if (data.affectedRows === 0) {
      return res.status(404).send({
        message: `File with id ${id} not found.`,
      });
    }

    // Sending a success response
    res.send({
      message: 'File was Updated successfully!',
    });
  } catch (err) {
    // Handling errors and sending a response with an error message
    res.status(500).send({
      message: err.message || 'Failed to Update file.',
    });
  }
};

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