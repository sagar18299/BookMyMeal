const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/getemployee', async (req, res) => {
  try {
    const employees = await User.find().select(
      'employeeId firstName lastName email'
    );

    res.status(200).send({ message : 'get all employee successfully.', data : { employees }  });

  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
