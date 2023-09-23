const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/Student'); // Adjust the path as needed
const CreateEvent = require('../models/CreateEvent'); // Adjust the path as needed

// Define a route to get all events associated with a specific user by email
router.post('/eventsByUser', async (req, res) => {
  try {
    const email = req.body.email;

    // Find the user by email
    const user = await StudentInfo.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use the user's eventIds to find all events associated with the user
    const events = await CreateEvent.find({ _id: { $in: user.eventIds } });

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events by user' });
  }
});

module.exports = router;
