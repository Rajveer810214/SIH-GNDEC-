const express = require('express');
const router = express.Router();
const markAttendance = require('../models/Attendance'); // Adjust the path as needed
const studentInfo = require('../models/Student');
router.use(express.json());

router.post('/update', async (req, res) => {
  try {
    const { email, checkIn, checkOut } = req.body;

    // Find the user by email
    const user = await studentInfo.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new attendance record
    const newAttendance = new markAttendance({
      checkIn,
      status: 'present', // Assuming you want to set attendance to 'present'
      checkOut,
      userIds: user._id, // Reference the user by their ObjectId
    });

    // Save the new attendance record to the database
    const savedAttendance = await newAttendance.save();

    res.status(200).json({ message: 'Attendance marked successfully', savedAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking attendance' });
  }
});

module.exports = router;
