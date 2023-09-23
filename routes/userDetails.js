// Import necessary modules
const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/Student'); // Adjust the path as needed

// Define the route handler for POST requests to add student information
router.post('/addStudent/:eventId', async (req, res) => {
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
        const existingStudent = await StudentInfo.findOne({
            email,
            eventIds: eventId,
        });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student with the same email already exists in this event',
            });
        }

        // Create a new StudentInfo document and associate it with the provided event ID
        const newStudent = new StudentInfo({
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
