// Import necessary modules
const express = require('express');
const router = express.Router();
const EventsDetails = require('../../../models/CreateEvent'); // Adjust the path as needed

// Define the route handler for POST requests
router.post('/event', async (req, res) => {
  try {
    // Extract data from the request body
    const { EventName, id } = req.body;
    // Create a new EventsDetails document
    const newEvent = new EventsDetails({
      EventName,
      societyId:id,
    });

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    res.status(201).json({ success: true, savedEvent }); // Respond with the saved event data
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
