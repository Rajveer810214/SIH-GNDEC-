const express = require('express');
const router = express.Router();
const markAttendance = require('../../../models/Attendance'); // Adjust the path as needed
const StudentEventInfo = require('../../../models/EventStudentDetails');
const isAdmin = require('../../../middleware/isAdmin');

router.use(express.json());

router.post('/attendance', isAdmin, async (req, res) => {
  try {
    const { email, checkIn, checkOut, eventIds } = req.body;

    // Find the user by email
    const user = await StudentEventInfo.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new attendance record
    const newAttendance = new markAttendance({
      checkIn,
      status: 'present', // Assuming you want to set attendance to 'present'
      checkOut,
      userIds: user._id,
      eventIds:eventIds
       // Reference the user by their ObjectId
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
