const express = require('express');
const router = express.Router();
const EventsDetails = require('../../../models/CreateEvent');
const SocietyInfo = require('../../../models/createSocietyAccount'); // Adjust the path as needed

// Define a route to get all events with society information
router.get('/allEvents', async (req, res) => {
  try {
    const allEvents = await EventsDetails.find();

    const eventsWithSociety = await Promise.all(allEvents.map(async (event) => {
      try {
        const society = await SocietyInfo.findById(event.societyId);
        return {
          eventId: event._id,
          EventName: event.EventName,
          societyName: society ? society.name : null,
          createdAt: event.createdAt
        };
      } catch (error) {
        console.error(error);
        return {
          eventId: event._id,
          EventName: event.EventName,
          societyId: event.societyId,
          societyName:null,
          createdAt: event.createdAt
        };
      }
    }));

    res.status(200).json({ events: eventsWithSociety });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events with society information' });
  }
});

module.exports = router;
