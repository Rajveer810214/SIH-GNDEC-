const express = require('express');
const router = express.Router();
const EventsDetails = require('../../../models/CreateEvent');
const StudentEventInfo = require('../../../models/EventStudentDetails');
const isAdmin = require('../../../middleware/isAdmin');

// Define a route to get all users for a specific event
router.get('/usersByEvent/:eventId', isAdmin, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event by eventId
    const event = await EventsDetails.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Use the eventId to find all users associated with the event
    const users = await StudentEventInfo.find({ eventIds: eventId });

    // Extract eventName and societyName from the found event
    const { EventName, SocietyName } = event;

    // Respond with the desired information
    res.status(200).json({ EventName, SocietyName, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users by event' });
  }
});

module.exports = router;
