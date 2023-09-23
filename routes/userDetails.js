// Import necessary modules
const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/Student'); // Adjust the path as needed

// Define the route handler for POST requests to add student information
router.post('/addStudent/:id', async (req, res) => {
  try {
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
      year
    } = req.body;

    // Check if a student with the same email already exists
    const existingEmailStudent = await StudentInfo.findOne({ email });

    // Check if a student with the same phone number already exists
    const existingPhoneStudent = await StudentInfo.findOne({ phone });

    // Check if a student with the same urn already exists
    const existingUrniStudent = await StudentInfo.findOne({ urn });

    if (existingEmailStudent) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    if (existingPhoneStudent) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already exists'
      });
    }

    if (existingUrniStudent) {
      return res.status(400).json({
        success: false,
        message: 'URN already exists'
      });
    }

    // Create a new StudentInfo document
    const newStudent = new StudentInfo({
      name,
      email,
      phone,
      gender,
      progressValue,
      course,
      branch,
      urn,
      year,
      eventIds: req.params.id
    });

    // Save the new student information to the database
    const savedStudent = await newStudent.save();

    res.status(201).json({ success: true, savedStudent }); // Respond with the saved student information
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
