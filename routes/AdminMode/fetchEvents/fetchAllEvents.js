const express = require('express');
const router = express.Router();
const EventsDetails = require('../../../models/CreateEvent'); // Adjust the path as needed
const isAdmin = require('../../../middleware/isAdmin');

// Define a route to get all events
router.get('/allEvents', isAdmin, async (req, res) => {
  try {
    // Use the `find` method to retrieve all events
    const allEvents = await EventsDetails.find();

    // Return the list of events in the response
    res.status(200).json({ events: allEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

module.exports = router;
