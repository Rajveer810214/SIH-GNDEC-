const express = require('express');
const router = express.Router();
const studentInfo = require('../../models/CreateUserAccount');
const fetchuser = require('../../middleware/fetchUser');
const EventStudentDetails = require('../../models/EventStudentDetails');
const EventsDetails = require('../../models/CreateEvent');
const SocietyInfo = require('../../models/createSocietyAccount'); // Assuming this is your society model

router.use(express.json());

router.get('/myregistration', fetchuser, async (req, res) => {
  let success = true;
  try {
    const userId = req.student.id;
    console.log(userId)
    // Find the user based on ID and exclude the password field
    const user = await studentInfo.findById(userId).select("-password");
console.log(user);
    // Find all event registrations for the user
    const userRegistrations = await EventStudentDetails.find({ email: user.email });

    // Extract event IDs from user registrations
    const eventIds = userRegistrations.map(registration => registration.eventIds);

    // Find event details for the extracted event IDs
    const participatedEvents = await EventsDetails.find({ _id: { $in: eventIds } });

    // Enhance the events with societyName
    const enhancedEvents = await Promise.all(participatedEvents.map(async event => {
      const society = await SocietyInfo.findById(event.societyId);
      return {
        event: {
          ...event.toObject(),
          societyName: society.name
        }
      };
    }));
    
    res.status(200).json({ success, user, participatedEvents: enhancedEvents });
  } catch (error) {
    success = false;
    console.error(error);
    res.status(500).json({ success, message: "Internal server error occurred" });
  }
});

module.exports = router;
