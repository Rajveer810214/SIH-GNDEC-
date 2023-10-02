const express = require('express');
const router = express.Router();
const StudentEventInfo = require('../../../models/EventStudentDetails'); // Adjust the path as needed
const CreateEvent = require('../../../models/CreateEvent'); // Adjust the path as needed

// Define a route to get a user and their associated events by email
router.post('/userparticipation', async (req, res) => {
  try {
    const email = req.body.email;
    // Find the user by email
    const user = await StudentEventInfo.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Find the events associated with the user based on eventIds
    const events = await CreateEvent.find({ _id: { $in: user.eventIds } });
    res.status(200).json({ user, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user and events' });
  }
});

module.exports = router;
