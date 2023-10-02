const express = require('express');
const router = express.Router();
const isSociety = require('../../../middleware/isSociety')
const EventAttendance = require('../../../models/Attendance');
const studentInfo = require('../../../models/EventStudentDetails');
router.use(express.json());

router.post('/result', isSociety, async (req, res) => {
  try {
    const { eventIds, urn, position } = req.body;
    // Find the user by jersey number
    const user = await studentInfo.findOne({ urn: urn });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedEvent = await EventAttendance.findOneAndUpdate(
      { eventIds: eventIds, userIds: user._id },
      { position: position },
      { new: true }
    );
    console.log(updatedEvent)
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found or user not registered for the event' });
    }
    res.status(200).json({ message: 'position updated successfully', updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating result' });
  }
});

module.exports = router;