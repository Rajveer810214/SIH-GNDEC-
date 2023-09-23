const express = require('express');
const router = express.Router();
const EventsDetails = require('../models/CreateEvent'); // Adjust the path as needed
const StudentInfo = require('../models/Student'); // Adjust the path as needed

// Define a route to get all users for a specific event
router.get('/usersByEvent/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    console.log(eventId);

    // Find the event by eventId
    const event = await EventsDetails.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Use the eventId to find all users associated with the event
    const users = await StudentInfo.find({ eventIds: eventId });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users by event' });
  }
});

module.exports = router;
