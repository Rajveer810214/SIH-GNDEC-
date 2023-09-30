// Import necessary modules
const express = require('express');
const router = express.Router();
const StudentEventInfo = require('../../models/EventStudentDetails'); // Adjust the path as needed
const { body, validationResult } = require('express-validator');

// Define the route handler for POST requests to add student information
router.post('/addStudent/:eventId', body('name', 'name should have a minimum length of 3').isLength({ min: 3 }),
body('email').custom((value) => {
    // Check if the email ends with "@gndec.ac.in"
    const emailRegex = /^[^\s@]+@(gmail\.com|gndec\.ac\.in)$/;
    if (!emailRegex.test(value)) {
        throw new Error('Invalid email format or email must end with gmail.com or gndec.ac.in');
    }
    return true; // Return true if validation passes
}),
body('phone').custom((value) => {
    // Check if the phone number is exactly 10 digits and doesn't start with "0"
    if (!/^[1-9]\d{9}$/.test(value)) {
        throw new Error('Invalid phone number. It should be exactly 10 digits and should not start with "0"');
    }
    return true; // Return true if validation passes
}),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
    }
    try {
        const eventId = req.params.eventId;
        // Extract data from the request body
        const {
            name,
            email,
            phone,
            gender,
            progressValue,
            course,
            branch,
            urn,
            crn,
            year
        } = req.body;

        // Check if a student with the same email or phone already exists within the same event
        const existingStudentEmail = await StudentEventInfo.findOne({
            email,
            eventIds: eventId,
        });
        const existingStudentPhone = await StudentEventInfo.findOne({
            phone,
            eventIds: eventId,
        });
        const existingStudentAcadDetails = await StudentEventInfo.findOne({
            crn,
            urn,
            eventIds: eventId,
        });

        if (existingStudentEmail) {
            return res.status(400).json({
                success: false,
                message: 'Student with the same email already exists in this event',
            });
        }
        if (existingStudentPhone) {
            return res.status(400).json({
                success: false,
                message: 'Student with the same Phone No. already exists in this event',
            });
        }
        if (existingStudentAcadDetails) {
            return res.status(400).json({
                success: false,
                message: 'Student with the same Academic Details already exists in this event',
            });
        }

        // Create a new StudentEventInfo document and associate it with the provided event ID
        const newStudent = new StudentEventInfo({
            name,
            email,
            phone,
            gender,
            progressValue,
            course,
            branch,
            urn,
            crn,
            year,
            eventIds: [eventId], // Associate with the event
        });

        // Save the new student information to the database
        const savedStudent = await newStudent.save();

        res.status(201).json({ success: true, savedStudent }); // Respond with the saved student information
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, success: false, message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
