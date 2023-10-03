const express = require('express');
const router = express.Router();
const Events = require('../../models/CreateEvent');
const studentEventInfo = require('../../models/EventStudentDetails');
const Attendance = require('../../models/Attendance'); // Import the Attendance model
const isSociety = require('../../middleware/isSociety');
router.use(express.json());

// Route to get all users participating in a specific event with attendance details
router.get('/eventparticipation/:eventId',isSociety, async (req, res) => {
    try {
        const eventId = req.params.eventId;

        if (!eventId) {
            return res.status(400).json({ success: false, message: "Event ID not provided" });
        }

        // Find the event
        const event = await Events.findById(eventId);

        if (!event) {
            return res.status(400).json({ success: false, message: "Event not found" });
        }

        // Find all users participating in the event
        const participants = await studentEventInfo.find({ eventIds: eventId });

        if (!participants || participants.length === 0) {
            return res.status(400).json({ success: false, message: "No participants found for the event" });
        }

        // Find attendance details for the event
        const attendanceDetails = await Attendance.find({ eventIds: eventId });

        // Combine participant details with attendance details
        const participantsWithAttendance = participants.map(participant => {
            const attendanceInfo = attendanceDetails.find(attendance => attendance.userIds.equals(participant._id));
            return {
                ...participant.toObject(),
                attendance: attendanceInfo ? attendanceInfo.status : "absent",
                position: attendanceInfo ? attendanceInfo.position : 0,
            };
        });

        return res.status(200).json({ success: true, event, participants: participantsWithAttendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
});

module.exports = router;
